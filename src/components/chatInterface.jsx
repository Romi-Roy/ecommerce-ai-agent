'use client';

import { useState } from 'react';

export default function ChatInterface() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [streamingResponse, setStreamingResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'Failed to get response' });
    } finally {
      setLoading(false);
    }
  };

  const handleStreamSubmit = async () => {
    if (!question.trim()) return;

    setStreamingResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, stream: true })
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setStreamingResponse(prev => prev + chunk);
      }
    } catch (error) {
      console.error('Streaming error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        AI E-commerce Data Agent
      </h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about your e-commerce data..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
          <button
            type="button"
            onClick={handleStreamSubmit}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Stream
          </button>
        </div>
      </form>

      {/* Example Questions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Try these questions:</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "What is my total sales?",
            "Calculate the RoAS",
            "Which product had the highest CPC?"
          ].map((q) => (
            <button
              key={q}
              onClick={() => setQuestion(q)}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Streaming Response */}
      {streamingResponse && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Live Response:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">
            {streamingResponse}
          </pre>
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {response.error ? (
            <div className="text-red-600">
              <h3 className="font-semibold">Error:</h3>
              <p>{response.error}</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-green-600">
                  {response.response}
                </h3>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold">Generated SQL:</h4>
                <code className="bg-gray-100 p-2 rounded block mt-1">
                  {response.sql}
                </code>
              </div>

              {response.results && response.results.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Results:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          {Object.keys(response.results[0]).map(key => (
                            <th key={key} className="border px-4 py-2 text-left">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {response.results.map((row, idx) => (
                          <tr key={idx}>
                            {Object.values(row).map((value, i) => (
                              <td key={i} className="border px-4 py-2">
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
