(function() {
  const DEFAULTS = {
    language: 'ar',
    themeColor: '#e63946',
    idleTime: 15000,
    message: 'هل تحتاج مساعدة؟',
    supportText: 'لاحظنا أنك لم تتفاعل منذ مدة. هل ترغب في الدعم؟',
    buttonText: 'نعم، أحتاج للمساعدة',
    alertText: 'تم إرسال طلب المساعدة. سيتم التواصل معك قريبًا.'
  };

  const userOptions = window.UX_OPTIONS || {};
  const config = { ...DEFAULTS, ...userOptions };

  const style = document.createElement('style');
  style.innerHTML = `
    .ux-help-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: ${config.themeColor};
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-size: 20px;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      z-index: 9999;
    }
    .ux-assistant-popup {
      display: none;
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 300px;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      padding: 15px;
      z-index: 9999;
      direction: ${config.language === 'ar' ? 'rtl' : 'ltr'};
      font-family: 'Cairo', sans-serif;
    }
    .ux-assistant-popup h3 {
      margin-top: 0;
      font-size: 18px;
      color: #1d3557;
    }
    .ux-assistant-popup button {
      margin-top: 10px;
      padding: 10px;
      width: 100%;
      background-color: #1d3557;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const helpBtn = document.createElement('button');
  helpBtn.className = 'ux-help-button';
  helpBtn.innerText = '؟';
  document.body.appendChild(helpBtn);

  const assistantBox = document.createElement('div');
  assistantBox.className = 'ux-assistant-popup';
  assistantBox.innerHTML = `
    <h3>${config.message}</h3>
    <p>${config.supportText}</p>
    <button>${config.buttonText}</button>
  `;
  document.body.appendChild(assistantBox);

  const supportButton = assistantBox.querySelector('button');
  supportButton.addEventListener('click', function() {
    alert(config.alertText);
    assistantBox.style.display = 'none';
  });

  helpBtn.addEventListener('click', () => {
    assistantBox.style.display = assistantBox.style.display === 'block' ? 'none' : 'block';
  });

  let lastActivity = Date.now();
  ['mousemove','click','keydown'].forEach(event => {
    document.addEventListener(event, () => lastActivity = Date.now());
  });

  setInterval(() => {
    if (Date.now() - lastActivity > config.idleTime) {
      assistantBox.style.display = 'block';
    }
  }, 5000);
})();