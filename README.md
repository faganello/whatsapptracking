
# Guia de Uso do WhatsappTracking

## Passo a Passo para Utilização

1. **Importe o módulo no seu HTML**

  Adicione a seguinte linha dentro da tag `<head>` ou antes do fechamento do `<body>`:

  ```html
  <script src="https://faganello.github.io/whatsapptracking/WhatsappTracking.js"></script>
  ```


1. **Defina o webhook e o link de redirecionamento do WhatsApp**

  Antes de usar, defina a URL do webhook e o link de redirecionamento do WhatsApp após importar o script:

  ```js
  // Exemplo:
  WhatsappTracking.setWebhookUrl('https://seu-endpoint.com/webhook');
  WhatsappTracking.setWhatsappRedirect('https://wa.me/5511999999999');
  ```

2. **Adicione o botão inicial, input e botão de envio na sua página**

  ```html
  <button id="btn-whatsapp">Falar no WhatsApp</button>
  <input type="tel" id="input-whatsapp" placeholder="Seu número de WhatsApp">
  <button id="enviar-whatsapp">Enviar</button>
  ```

3. **Implemente a interface dinâmica**

   O input e o botão de envio já estão presentes no HTML, mas devem começar ocultos. O botão inicial apenas exibe esses campos, e o botão de envio faz o envio dos dados. Veja [demo.html](https://faganello.github.io/whatsapptracking/demo.html?utm_source=tagassistant.google.com&utm_medium=meio_teste&utm_campaign=nome+da+campanha&utm_id=0000123456&utm_term=termo+da+campanha&utm_content=conte%C3%BAdo+da+campanha) para um exemplo completo.
   

4. **Pronto!**

   O fluxo está funcional: ao clicar no botão inicial, o campo de telefone e o botão de envio aparecem. Ao enviar, os dados são capturados e enviados ao webhook, e o usuário é redirecionado para o WhatsApp.

---

## Visão Geral

O módulo `WhatsappTracking` é responsável por capturar dados de campanha (UTM), domínio e número de WhatsApp do usuário, e enviar essas informações para um endpoint (webhook) externo. Ele foi projetado para ser reutilizável e desacoplado da interface, permitindo integração fácil com diferentes componentes de UI.

## Funcionalidades

- **Captura de parâmetros UTM**: Extrai automaticamente os parâmetros de campanha da URL (como `utm_source`, `utm_medium`, etc.).
- **Captura do domínio**: Adiciona o domínio atual do site aos dados enviados.
- **Captura do número de WhatsApp**: Recebe o número informado pelo usuário via interface.
- **Envio dos dados**: Realiza uma requisição HTTP POST para um webhook configurado, enviando todos os dados capturados em formato JSON.
- **Redirecionamento**: Após o envio, redireciona o usuário para o WhatsApp com o número pré-definido.

## API do Módulo

O módulo expõe os seguintes membros:

### `enviarDadosWhatsapp(numero)`
- **Parâmetro:**
  - `numero` (string): Número de WhatsApp informado pelo usuário.
- **Descrição:**
  - Captura os parâmetros UTM da URL, o domínio atual e o número de WhatsApp informado.
  - Envia esses dados para o webhook configurado via POST.
  - Redireciona o usuário para o WhatsApp.

### `inputId` e `buttonId`
- **Descrição:**
  - IDs padrão recomendados para o campo de input e botão de envio na interface. Devem ser usados para garantir integração correta com o módulo.

## Exemplo de Uso

```js
// Exemplo de integração com a interface:
WhatsappTracking.setWebhookUrl('https://seu-endpoint.com/webhook');
WhatsappTracking.setWhatsappRedirect('https://wa.me/5511999999999');
document.getElementById('enviar-whatsapp').onclick = function() {
  const numero = document.getElementById('input-whatsapp').value;
  WhatsappTracking.enviarDadosWhatsapp(numero);
};
```

## Requisitos de Interface

Para o funcionamento correto do sistema, a interface deve conter:

- **Botão inicial**: Um botão visível ao usuário, que pode conter um link ou ícone do WhatsApp, com o ID `btn-whatsapp`. Este botão é responsável por acionar a exibição do campo de input.
- **Campo de input**: Um campo de texto do tipo `tel` com o ID definido por `WhatsappTracking.inputId` (`input-whatsapp`).
- **Botão de envio**: Um botão com o ID definido por `WhatsappTracking.buttonId` (`enviar-whatsapp`), responsável por acionar o envio dos dados para o webhook e o redirecionamento para o WhatsApp.

> **Importante:** Os IDs dos elementos devem ser respeitados para garantir a integração correta com o módulo. O botão inicial pode conter um link ou ícone do WhatsApp, mas o fluxo de captura e envio depende da existência do input e do botão de envio conforme o padrão acima.


## Exemplo Mínimo de HTML

```html
<!-- Botão inicial -->
<button id="btn-whatsapp">Falar no WhatsApp</button>

<!-- O input e o botão de envio são inseridos dinamicamente pelo JS,
     mas podem ser criados manualmente para integração direta: -->
<input type="tel" id="input-whatsapp" placeholder="Seu número de WhatsApp">
<button id="enviar-whatsapp">Enviar</button>
```

> O fluxo padrão é que apenas o botão inicial esteja presente na página. O input e o botão de envio são exibidos dinamicamente após o clique, mas podem ser inseridos manualmente se necessário, desde que respeitem os IDs.

## Observações
- O módulo não depende de frameworks externos.
- O webhook e o número de WhatsApp de redirecionamento devem ser definidos pelo usuário antes de usar a biblioteca, usando os métodos `setWebhookUrl` e `setWhatsappRedirect`.
- O módulo pode ser facilmente extraído para um arquivo JS separado (WhatsappTracking.js) para uso em outros projetos.
