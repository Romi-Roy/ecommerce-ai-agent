import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateSQL } from '@/lib/gemini';
import { executeQuery } from '@/lib/database';

interface ChatRequest {
  question: string;
  stream?: boolean;
}

interface ChatResponse {
  sql?: string;
  results?: Record<string, unknown>[];
  response?: string;
  timestamp?: string;
  error?: string;
  details?: string;
}

// Return JSON for non-stream requests
async function handleNormal(reqBody: ChatRequest): Promise<ChatResponse> {
  const sql = await generateSQL(reqBody.question);
  const results = executeQuery(sql);

  let formattedResponse: string;
  if (results.length === 1 && Object.keys(results[0]).length === 1) {
    const value = Object.values(results[0])[0];
    formattedResponse = `The answer is: ${value}`;
  } else if (results.length > 0) {
    formattedResponse = `Found ${results.length} result(s)`;
  } else {
    formattedResponse = 'No results found';
  }

  return {
    sql,
    results,
    response: formattedResponse,
    timestamp: new Date().toISOString()
  };
}

// Return a streaming response
async function handleStream(reqBody: ChatRequest): Promise<Response> {
  const sql = await generateSQL(reqBody.question);
  const results = executeQuery(sql);
  
  const formatted = results
    .map(row => JSON.stringify(row, null, 2))
    .join('\n');

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`SQL:\n${sql}\n\n`));
      controller.enqueue(encoder.encode(`Results:\n${formatted}\n`));
      controller.close();
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain' }
  });
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = (await request.json()) as ChatRequest;

    if (!reqBody.question?.trim()) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    if (reqBody.stream) {
      return await handleStream(reqBody);
    }

    const data = await handleNormal(reqBody);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    );
  }
}
