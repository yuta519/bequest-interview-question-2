import express, { Request, Response } from "express";
import cors from "cors";

import {
  Data,
  createData,
  getLatestData,
  restoreFromBackup,
  verifyDatabase,
} from "./db/database";

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

type ErrorResponse = {
  error: string;
};

app.get("/", (_, res: Response<Data | null | ErrorResponse>) => {
  try {
    const data = getLatestData();
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

app.post(
  "/",
  (req: Request<{ data: string }>, res: Response<Data | ErrorResponse>) => {
    try {
      const input = req.body.data;
      const data = createData(input);
      return res.status(201).json(data);
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

app.post(
  "/restore",
  (_, res: Response<{ success: boolean } | ErrorResponse>) => {
    try {
      restoreFromBackup();
      return res.status(201).json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
