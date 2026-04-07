const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// ✅ YOUR REAL WORKER URL
const API_URL = "https://odd-bush-69db.cacci2611.workers.dev";

// Message history
const messages = [
  {
    role: "system",
    content:
      "You are a L’Oréal beauty assistant. Only answer questions about L’Oréal products, skincare, makeup, haircare, fragrances, and routines. If unrelated, politely refuse."
  }
];

// Initial message
addMessage("ai", "👋 Hello! Ask me about L’Oréal products or routines.");

// Handle form submit
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage("user", userText);
  userInput.value = "";

  messages.push({ role: "user", content: userText });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();

    console.log("FRONTEND DATA:", data);

    // ✅ SAFE + GUARANTEED RESPONSE PARSING
    let aiText = "⚠️ No response from AI";

    try {
      aiText = data.choices[0].message.content;
    } catch (err) {
      console.error("Parsing error:", err);
    }

    addMessage("ai", aiText);
    messages.push({ role: "assistant", content: aiText });

  } catch (error) {
    addMessage("ai", "⚠️ Error connecting to AI.");
    console.error("Fetch error:", error);
  }
});

// Display messages
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);

  msg.textContent =
    sender === "user" ? `You: ${text}` : text;

  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}