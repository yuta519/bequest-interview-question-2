import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

type Data = {
  id: number;
  content: string;
};

export default function useData() {
  const [input, setInput] = useState<string | undefined>();
  const [latestData, setLatestData] = useState<Data>();

  const getData = async (): Promise<void> => {
    const response = await fetch(API_URL);
    const data: Data = await response.json();
    setLatestData(data);
  };

  const updateData = async (): Promise<boolean> => {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ input }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.status === 201;
  };

  const verifyData = async (): Promise<boolean> => {
    const response = await fetch(`${API_URL}/verify`);
    const { isDatabaseValid }: { isDatabaseValid: boolean } =
      await response.json();
    return isDatabaseValid;
  };

  const restoreData = async (): Promise<boolean> => {
    const response = await fetch(`${API_URL}/restore`);
    const { success }: { success: boolean } = await response.json();
    return success;
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    latestData,
    input,
    setInput,
    getData,
    updateData,
    verifyData,
    restoreData,
  };
}
