"use client";
import { useState, useRef } from "react";
import { uploadDocument } from "@services/documentService";
import { useAuth } from "@hooks/useAuth";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !token) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadDocument(formData, token);
      setMessage("Upload successful!");
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (error: any) {
      setMessage(error?.response?.data?.detail || "Upload failed.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
      {message && <p className="text-blue-600">{message}</p>}
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          ref={inputRef}
          accept=".pdf,.docx,.txt"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
