const express = require('express');
const cors = require('cors');
const { PORT } = require('./src/config');
const authService = require('./src/whatsapp/authService');
const messageService = require('./src/whatsapp/messageService');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

app.post('/authenticate', authService.authenticate);
app.get('/get-qr/:matricula', authService.getQrCode);
app.post('/send-message', messageService.sendMessage);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
