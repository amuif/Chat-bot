import express from "express";
const app = express();

import cors from "cors";

app.use(cors());
app.use(express.json());

require("dotenv").config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

app.post("/gemini", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: req.body.history,
  });

  const msg = req.body.message;

  const result = await chat.sendMessage(msg);

  const response = await result.response;

  const text = response.text();

  res.send(text);
});

app.listen(5000, () => console.log("Listening on Port", 5000));
