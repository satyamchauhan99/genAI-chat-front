import axios from "@utils/axiosInstance";

export interface DocumentItem {
    id: string;
    filename: string;
    uploaded_at?: string;
  }

export const uploadDocument = async (formData: FormData, token: string) => {
  const res = await axios.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


  
export const fetchDocuments = async (token: string): Promise<DocumentItem[]> => {
    const res = await axios.get("/documents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  