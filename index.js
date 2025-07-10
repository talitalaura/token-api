const express = require('express');
const bodyParser = require('body-parser');
const { encoding_for_model } = require('gpt-tokenizer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/tokens', (req, res) => {
  const { model = 'gpt-4o', prompt = '', completion = '' } = req.body;

  try {
    const encoder = encoding_for_model(model);

    const input_tokens = encoder.encode(prompt).length;
    const output_tokens = encoder.encode(completion).length;
    const total_tokens = input_tokens + output_tokens;

    res.json({
      input_tokens,
      output_tokens,
      total_tokens
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao calcular tokens', detalhes: err.message });
  }
});

app.get('/', (_, res) => {
  res.send('🧠 API de Tokens rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
