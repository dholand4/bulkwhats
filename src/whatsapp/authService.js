const { initializeClient, qrCodes, authenticatedUsers } = require('./clientManager');
const matriculasAutorizadas = require('../matriculas.json').validas;

function authenticate(req, res) {
    const { matricula } = req.body;

    if (!matricula) {
        return res.status(400).send('Matrícula inválida');
    }

    if (!matriculasAutorizadas.includes(matricula)) {
        return res.status(403).send('Matrícula não autorizada');
    }

    initializeClient(matricula);
    res.status(200).send('Cliente inicializado. Aguarde o QR Code.');
}

function getQrCode(req, res) {
    const { matricula } = req.params;

    if (!matriculasAutorizadas.includes(matricula)) {
        return res.status(403).send('Matrícula não autorizada');
    }

    if (authenticatedUsers.has(matricula)) {
        return res.status(200).json({ message: 'Já autenticado' });
    }

    if (qrCodes.has(matricula)) {
        return res.status(200).json({ qrCode: qrCodes.get(matricula) });
    }

    res.status(404).send('QR Code não disponível');
}

module.exports = { authenticate, getQrCode };
