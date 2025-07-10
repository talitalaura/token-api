import express from 'express';
import bodyParser from 'body-parser';
import { encode } from 'gpt-3-encoder';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/tokens', (req, res) => {
  const { prompt = '', completion = '' } = req.body;

  try {
    const input_tokens = encode(prompt).length;
    const output_tokens = encode(completion).length;
    const total_tokens = input_tokens + output_tokens;

    res.json({ input_tokens, output_tokens, total_tokens });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular tokens', detalhes: error.message });
  }
});

app.get('/', (_, res) => {
  res.send('🧠 API de Tokens rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
