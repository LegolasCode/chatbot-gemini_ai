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

app.post((req, res) => {
  const { body } = req;

  if (!body) {
    res.status(400).send("Tidak ada payload yang dikirim!");
  }

  if (typeof body !== "object") {
    res.status(400).send("Payload harus berupa objek!");
  }

});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Halo Dunia!",
  });
  console.log(response.text);
}

await main();