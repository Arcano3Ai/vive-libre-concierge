(function() {
  // --- Configuración e Inyección de Estilos ---
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --chat-primary: #f37021;
      --chat-dark: #121212;
      --chat-accent: #2b1c11;
      --chat-text: #ffffff;
      --chat-glass: rgba(20, 20, 20, 0.95);
      --chat-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
      --chat-radius: 20px;
    }

    .vive-widget-launcher {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: var(--chat-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      box-shadow: var(--chat-shadow);
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .vive-widget-launcher:hover { transform: scale(1.1); }

    .vive-chat-window {
      position: fixed;
      bottom: 100px;
      right: 30px;
      width: 380px;
      height: 550px;
      background: var(--chat-dark);
      border-radius: var(--chat-radius);
      box-shadow: var(--chat-shadow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 10000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.4s ease;
      font-family: 'Inter', sans-serif;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .vive-chat-window.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .vive-chat-header {
      background: var(--chat-accent);
      padding: 20px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--chat-primary);
    }
    .vive-chat-header h4 { margin: 0; font-size: 1.1rem; }
    .vive-chat-close { background: none; border: none; color: white; cursor: pointer; font-size: 20px; }

    .vive-chat-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .vive-msg {
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 0.9rem;
      max-width: 85%;
      line-height: 1.4;
    }
    .vive-msg.bot { background: var(--chat-accent); color: white; align-self: flex-start; border-bottom-left-radius: 2px; }
    .vive-msg.user { background: var(--chat-primary); color: white; align-self: flex-end; border-bottom-right-radius: 2px; }

    .vive-chat-input-area {
      padding: 15px;
      background: var(--chat-accent);
      display: flex;
      gap: 10px;
    }
    .vive-chat-input {
      flex: 1;
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      padding: 10px 15px;
      border-radius: 20px;
      outline: none;
    }
    .vive-chat-send {
      background: var(--chat-primary);
      border: none;
      color: white;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      cursor: pointer;
    }

    @media (max-width: 480px) {
      .vive-chat-window { width: calc(100vw - 40px); right: 20px; bottom: 100px; height: 500px;}
    }
  `;
  document.head.appendChild(style);

  // --- Construcción del DOM ---
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'vive-concierge-widget';
  
  widgetContainer.innerHTML = `
    <div class="vive-widget-launcher" id="vive-launcher">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
    </div>
    <div class="vive-chat-window" id="vive-window">
      <div class="vive-chat-header">
        <h4>Sergio | Concierge Vive Libre</h4>
        <button class="vive-chat-close" id="vive-close">&times;</button>
      </div>
      <div class="vive-chat-messages" id="vive-messages">
        <div class="vive-msg bot">¡Hola! Soy Sergio, tu experto en Vive Libre. ¿Buscas una escapada de lujo o un retiro para tu equipo?</div>
      </div>
      <div class="vive-chat-input-area">
        <input type="text" class="vive-chat-input" id="vive-input" placeholder="Pregunta algo...">
        <button class="vive-chat-send" id="vive-send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(widgetContainer);

  // --- Lógica de Interacción ---
  const launcher = document.getElementById('vive-launcher');
  const chatWindow = document.getElementById('vive-window');
  const closeBtn = document.getElementById('vive-close');
  const input = document.getElementById('vive-input');
  const sendBtn = document.getElementById('vive-send');
  const messagesContainer = document.getElementById('vive-messages');

  const toggleChat = () => chatWindow.classList.toggle('active');
  launcher.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  const addMessage = (text, type) => {
    const div = document.createElement('div');
    div.className = `vive-msg ${type}`;
    div.innerText = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const sendMessage = async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    // Simulación de respuesta IA (Enlazar con tu API real aquí)
    setTimeout(() => {
      addMessage("Recibido. Estoy analizando las mejores opciones de cabañas para ti en Santiago...", 'bot');
    }, 1000);
  };

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

  // Despliegue Inteligente: Se abre automáticamente tras 5 segundos
  setTimeout(() => {
    if (!chatWindow.classList.contains('active')) {
      chatWindow.classList.add('active');
    }
  }, 5000);

})();
