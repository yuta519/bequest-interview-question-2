import express, { Request, Response } from "express";
import cors from "cors";

import {
  createData,
  getLatestData,
  restoreFromBackup,
  verifyDatabase,
} from "./db/database";

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

type DataResponse = {
  id: number;
  content: string;
};

type ErrorResponse = {
  error: string;
};

app.get("/", (_, res: Response<DataResponse | null | ErrorResponse>) => {
  try {
    const data = getLatestData();
    return res
      .status(201)
      .json(data ? { id: data.id, content: data.content } : null);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

app.post(
  "/",
  (
    req: Request<{ input: string }>,
    res: Response<DataResponse | ErrorResponse>
  ) => {
    try {
      const input = req.body.input;
      const data = createData(input);
      return res.status(201).json({ id: data.id, content: data.content });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

app.get("/verify", (_, res: Response<{} | ErrorResponse>) => {
  try {
    const valid = verifyDatabase();
    return res.status(200).json({ isDatabaseValid: valid });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

app.get(
  "/restore",
  (_, res: Response<{ success: boolean } | ErrorResponse>) => {
    try {
      restoreFromBackup();
      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
