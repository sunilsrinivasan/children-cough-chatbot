let flow = null;
let currentStep = null;

async function loadChatbot() {
  const response = await fetch("cough_checker.json");
  flow = await response.json();
  currentStep = flow.start_step;
  renderStep();
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
  if (step.options) {
    step.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt.label;
      btn.onclick = () => {
        currentStep = opt.next;
        renderStep();
      };
      chatbox.appendChild(btn);
    });
  }
}

window.onload = loadChatbot;