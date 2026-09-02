exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" })
      };
    }

    const { question } = JSON.parse(event.body || "{}");

    if (!question || !question.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Please enter a question."
        })
      };
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
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
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "LETH could not get an answer from the AI."
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: data.output_text
      })
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "LETH could not answer right now."
      })
    };
  }
};
