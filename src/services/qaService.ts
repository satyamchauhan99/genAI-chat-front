import axios from "@utils/axiosInstance";

export const askQuestion = async (
  docId: string,
  question: string,
  token: string
) => {
  const res = await axios.post(
    "/ask",
    { doc_id: docId, question },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data; // should include answer
};
