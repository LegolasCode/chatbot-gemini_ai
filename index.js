import { GoogleGenAI } from "@google/genai";
import express from "express";
import multer from "multer";
import fs from "fs/promises";
import cors from "cors";

import 'dotenv/config';

const app  = express();
const upload = multer();
const ai = new GoogleGenAI({});

// inisiasi model AI
const geminiModel = {
  text: "gemini-2.5-flash-lite",
  image: "gemini-2.5-flash",
  video: "gemini-2.5-flash",
  document: "gemini-2.5-flash-lite"
}

// inisiasi aplikasi backend/server
app.use(cors()); // panggil/bikin middleware
app.use(express.json()); // untuk membolehkan menggunakan JSON

// inisiasi route
// get(), .post(), .put(), .patch(), .delete()

app.post('/generate-text', async(req, res) => {
  const { body } = req;

  if (!body) {
    res.status(400).json({ message: "Tidak ada payload yang dikirim!" });
    return;
  }
  
  if (typeof body !== "object") {
    res.status(400).json({ message: "Payload harus berupa objek!" });
    return;
  }

  const { message } = body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ message: "Pesan tidak ada atau formatnaya tidak sesuai!" });
    return;
  }
  const response = await ai.models.generateContent({
    contents: message,
    model: geminiModel.text
  });

  res.status(200).json({
    reply: response.text
  });
});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Halo Dunia!",
//   });
//   console.log(response.text);
// }

// await main();

const port = 3000;

app.listen(port, () => {
  console.log("I LOVE YOU", port);
});