"use client";
import { useState, useEffect } from "react";
import { askQuestion } from "@services/qaService";
import { fetchDocuments, DocumentItem } from "@services/documentService";
import { useAuth } from "@hooks/useAuth";

export default function AskPage() {
  const { token } = useAuth();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDocs = async () => {
      try {
        if (!token) return;
        const docs = await fetchDocuments(token);
        setDocuments(docs);
        if (docs.length > 0) setSelectedDoc(docs[0].id);
      } catch (err: any) {
        setError("Failed to fetch documents.");
      }
    };
    loadDocs();
  }, [token]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnswer("");
    setError("");
    if (!question || !selectedDoc || !token) {
      setError("Please select a document and enter a question.");
      return;
    }

    setLoading(true);
    try {
      const res = await askQuestion(selectedDoc, question, token);
      setAnswer(res.answer || "No answer found.");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Error asking question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Ask a Question</h2>

      <form onSubmit={handleAsk} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Document</label>
          <select
            value={selectedDoc}
            onChange={(e) => setSelectedDoc(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {documents.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.filename}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Your Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What is this document about?"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded border">
          <h3 className="font-semibold mb-2">Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
