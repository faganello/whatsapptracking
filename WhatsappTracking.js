// WhatsappTracking.js
// Módulo responsável por capturar dados de campanha, domínio e WhatsApp e enviá-los ao webhook.

const WhatsappTracking = (function() {
  // Padrão mínimo para input e botão: ids fixos e estilos básicos
  const inputId = 'input-whatsapp';
  const buttonId = 'enviar-whatsapp';
  let webhookUrl = '';
  let whatsappRedirect = '';

  function getUTMParams() {
    const params = new URLSearchParams(window.location.search);
    const utmData = {};
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'utm_id'];
    keys.forEach(key => {
      if (params.has(key)) {
        utmData[key] = params.get(key);
      }
    });
    return utmData;
  }

  async function enviarDadosWhatsapp(numero) {
    if (!numero || String(numero).trim() === '') {
      alert('Por favor, preencha o número do WhatsApp antes de enviar.');
      return;
    }
    if (!webhookUrl || webhookUrl.trim() === '') {
      console.error('WhatsappTracking: webhookUrl não foi definido. Use setWebhookUrl(url) antes de enviar.');
      return;
    }
    if (!whatsappRedirect || whatsappRedirect.trim() === '') {
      console.error('WhatsappTracking: whatsappRedirect não foi definido. Use setWhatsappRedirect(url) antes de enviar.');
      return;
    }
    const dados = getUTMParams();
    dados['whatsapp_number'] = numero;
    dados['domain'] = window.location.hostname;
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    } catch (e) {
      console.error('Erro ao enviar para o webhook:', e);
    }
    window.open(whatsappRedirect, '_blank');
  }


  function setWhatsappRedirect(url) {
    whatsappRedirect = url;
  }

  function setWebhookUrl(url) {
    webhookUrl = url;
  }

  // Expor função principal para uso externo
  return {
    enviarDadosWhatsapp,
    inputId,
    buttonId,
    setWhatsappRedirect,
    setWebhookUrl
  };
})();
