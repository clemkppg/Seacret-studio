const generateBtn = document.getElementById("generateBtn");
const gamePrompt = document.getElementById("gamePrompt");
const output = document.getElementById("output");

generateBtn.addEventListener("click", () => {
  const prompt = gamePrompt.value.trim();

  if (!prompt) {
    output.textContent = "Veuillez entrer une idée de jeu.";
    return;
  }

  output.textContent = "🧠 Génération de votre jeu...";

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer VOTRE_CLE_API_ICI"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Tu es un développeur expert qui génère du code de jeu." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    })
  })
  .then(res => res.json())
  .then(data => {
    const response = data.choices?.[0]?.message?.content || "❌ Erreur de génération.";
    output.textContent = response;
  })
  .catch(() => {
    output.textContent = "❌ Erreur lors de la requête à l'API.";
  });
});