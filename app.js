const questionInput = document.getElementById("question");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const startLearning = document.getElementById("startLearning");

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.innerHTML = text;
  chatMessages.prepend(message);
}

function getLETHResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("acceleration")) {
    return `
      <strong>🤖 LETH</strong>

      <p style="margin-top:10px;">
        <strong>Answer:</strong>
        Acceleration is the rate at which velocity changes.
      </p>

      <p style="margin-top:10px;">
        <strong>Explanation:</strong><br>
        It tells us how quickly an object's velocity changes.
      </p>

      <p style="margin-top:10px;">
        <strong>Formula:</strong><br>
        Acceleration = Change in velocity ÷ Time
      </p>

      <p style="margin-top:10px;">
        <strong>Example:</strong><br>
        If a car changes from 10 m/s to 20 m/s in 5 seconds,
        its acceleration is 2 m/s².
      </p>

      <p style="margin-top:10px;">
        <strong>🧠 Practice:</strong><br>
        What is the SI unit of acceleration?
      </p>
    `;
  }

  if (q.includes("photosynthesis")) {
    return `
      <strong>🤖 LETH</strong>

      <p style="margin-top:10px;">
        <strong>Answer:</strong>
        Photosynthesis is the process by which green plants make their food.
      </p>

      <p style="margin-top:10px;">
        <strong>Explanation:</strong><br>
        Plants use light energy, water and carbon dioxide
        to produce glucose and oxygen.
      </p>

      <p style="margin-top:10px;">
        <strong>🧠 Practice:</strong><br>
        Which gas do plants take in during photosynthesis?
      </p>
    `;
  }

  return `
    <strong>🤖 LETH</strong>

    <p style="margin-top:10px;">
      <strong>Answer:</strong>
      That's a good question!
    </p>

    <p style="margin-top:10px;">
      <strong>Explanation:</strong><br>
      I'm still learning how to answer different subjects
      in this test version.
    </p>

    <p style="margin-top:10px;">
      Try asking me about <strong>acceleration</strong>
      or <strong>photosynthesis</strong>.
    </p>
  `;
}

function answerQuestion() {
  const question = questionInput.value.trim();

  if (!question) {
    return;
  }

  addMessage(question, "user");

  const response = getLETHResponse(question);

  addMessage(response, "ai");

  questionInput.value = "";
}

sendButton.addEventListener("click", answerQuestion);

questionInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    answerQuestion();
  }
});

startLearning.addEventListener("click", function() {
  questionInput.focus();
});
