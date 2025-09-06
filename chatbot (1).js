let flow = null;
let currentStep = null;

async function loadChatbot() {
  try {
    const response = await fetch("cough_checker.json?ts=" + Date.now()); // cache-buster
    flow = await response.json();
    currentStep = flow.start_step;
    renderStep();
  } catch (err) {
    console.error("Error loading chatbot:", err);
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML = "<p>Failed to load chatbot. Please try again later.</p>";
  }
}

function renderStep() {
  const step = flow.steps[currentStep];
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML = "";

  // Message
  const msg = document.createElement("p");
  msg.textContent = step.message;
  chatbox.appendChild(msg);

  // Buttons if options exist
  if (step.options && step.options.length > 0) {
    step.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt.label;
      btn.onclick = () => {
        currentStep = opt.next;
        renderStep();
      };
      chatbox.appendChild(btn);
    });
  } else {
    // Terminal step: show Restart button
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart";
    restartBtn.onclick = () => {
      currentStep = flow.start_step;
      renderStep();
    };
    chatbox.appendChild(restartBtn);
  }
}
