const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    message: "LETH AI backend is running!"
  });
});

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Please enter a question."
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions: `
You are LETH (Learning Thing), a friendly AI tutor.

Rules:
1. Give the answer FIRST.
2. Explain the answer SECOND.
3. Use simple language.
4. Give an example when useful.
5. Encourage the student.
6. Correct mistakes kindly.
7. Give a short practice question when appropriate.
      `,
      input: question
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "LETH could not answer right now."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`LETH backend running on port ${PORT}`);
});
