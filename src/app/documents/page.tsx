"use client";
import { useEffect, useState } from "react";
import { fetchDocuments, DocumentItem } from "@services/documentService";
import { useAuth } from "@hooks/useAuth";

export default function DocumentsPage() {
  const { token } = useAuth();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDocs = async () => {
      if (!token) {
        setError("Unauthorized access.");
        setLoading(false);
        return;
      }

      try {
        const docs = await fetchDocuments(token);
        setDocuments(docs);
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    loadDocs();
  }, [token]);

  if (loading) return <p className="text-center">Loading documents...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Your Documents</h2>
      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="font-medium">{doc.filename}</span>
              <span className="text-sm text-gray-500">
                {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleString() : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
