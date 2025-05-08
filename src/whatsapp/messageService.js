const { WHATSAPP_SUFFIX } = require('../config');
const { clients } = require('./clientManager');
const helpers = require('../utils/helpers');

async function sendMessage(req, res) {
    const { matricula, recipients, messageTemplate } = req.body;
    if (!clients.has(matricula)) {
        return res.status(400).send('Cliente não autenticado ou não inicializado');
    }

    const client = clients.get(matricula);
    try {
        for (let recipient of recipients) {
            const formattedNumber = helpers.formatPhoneNumber(recipient.number);
            const chatId = `${formattedNumber}${WHATSAPP_SUFFIX}`;
            const personalizedMessage = messageTemplate.replace('{name}', recipient.name);
            await client.sendMessage(chatId, personalizedMessage);
            console.log(`Mensagem enviada para ${recipient.name} (${formattedNumber})`);
        }
        res.status(200).send('Envio concluído');
    } catch (error) {
        console.error('Erro ao enviar mensagens:', error);
        res.status(500).send('Erro ao enviar mensagem.');
    }
}

module.exports = { sendMessage };
