import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in the environment variables.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are an AI assistant that converts natural language questions about e-commerce data into SQL queries.

Database Schema:
1. product_eligibility: 
   - item_id (integer)
   - eligibility (boolean) 
   - message (text)
   - eligibility_datetime_utc (text)

2. ad_sales_metrics:
   - item_id (integer)
   - ad_sales (real)
   - impressions (integer) 
   - ad_spend (real)
   - clicks (integer)
   - units_sold (integer)
   - date (text)

3. total_sales_metrics:
   - item_id (integer)
   - total_sales (real)
   - total_units_ordered (integer)
   - date (text)

Important Rules:
- Calculate RoAS (Return on Ad Spend) as: (ad_sales / ad_spend) * 100
- Calculate CPC (Cost Per Click) as: ad_spend / clicks  
- Always include WHERE clauses to avoid division by zero
- Return ONLY the SQL query, no explanations or markdown
- Use proper SQL syntax for SQLite

Examples:
Question: "What is my total sales?"
SQL: SELECT SUM(total_sales) as total_sales FROM total_sales_metrics

Question: "Calculate the RoAS"  
SQL: SELECT (SUM(ad_sales) / SUM(ad_spend)) * 100 as roas FROM ad_sales_metrics WHERE ad_spend > 0

Question: "Which product had the highest CPC?"
SQL: SELECT item_id, (ad_spend / clicks) as cpc FROM ad_sales_metrics WHERE clicks > 0 ORDER BY cpc DESC LIMIT 1`;

export const generateSQL = async (question: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `${SYSTEM_PROMPT}\n\nQuestion: "${question}"\nSQL:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const sql = response.text().trim();

    return sql.replace(/```sql\n?|```/g, '').trim(); // removes backticks and optional sql lang tag
  } catch (error) {
    console.error('Error generating SQL:', error);
    throw new Error('Failed to generate SQL query.');
  }
};
