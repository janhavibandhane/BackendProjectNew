import { pipeline } from '@xenova/transformers';

let pipe;

// Load the model once at server start
export const loadModel = async () => {
  try {
    console.log('⏳ Loading local model: Xenova/distilgpt2...');
    pipe = await pipeline('text-generation', 'Xenova/llama2.c-stories15M');
    console.log('✅ Model loaded successfully!');
  } catch (error) {
    console.error('❌ Failed to load model:', error);
  }
};

// Handle POST request to generate a reply
export const sendMessage = async (req, res) => {
  const { message } = req.body;

  if (!pipe) {
    return res.status(503).json({ error: 'Model not ready yet. Try again shortly.' });
  }

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Valid message is required.' });
  }

  // Simple prompt for distilgpt2 (no special formatting)
  const prompt = `${message.trim()}\n`;

  try {
    const output = await pipe(prompt, {
      temperature: 0.7,
      max_new_tokens: 100,
    });

    const generated = output?.[0]?.generated_text || '';
    console.log('🧠 Generated:', generated);

    // Remove the prompt from the response
    const reply = generated.replace(prompt, '').trim();

    res.json({ reply: reply || 'No meaningful reply generated.' });
  } catch (error) {
    console.error('❌ Text generation error:', error);
    res.status(500).json({ error: 'Failed to generate response.' });
  }
};
