module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { image } = req.body || {};
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

    try {
          const response = await fetch('https://api.anthropic.com/v1/messages', {
                  method: 'POST',
                  headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': apiKey,
                            'anthropic-version': '2023-06-01'
                  },
                          body: JSON.stringify({
                                    model: 'claude-opus-4-5',
                                    max_tokens: 256,
                                    messages: [{
                                                role: 'user',
                                                content: [
                                                  {
                                                                  type: 'image',
                                                                  source: { type: 'base64', media_type: 'image/jpeg', data: image }
                                                  },
                                                  {
                                                                  type: 'text',
                                                                  text: 'Look at this face photo and identify the facial expression. Return ONLY a valid JSON object, no extra text, no markdown: {"main":"😊","emojis":["😊","😄","🙂"],"labels":["שמח","מחייך","נינוח"],"expression":"שמח"}. If no face detected: {"main":"🤷","emojis":["🤷","😶","❓"],"labels":["לא זוהה","נסה שוב","?"],"expression":"לא זוהה פנים"}'
                                                  }
                                                            ]
                                    }]
                          })
          });

          const data = await response.json();
          const text = data.content?.[0]?.text || '{}';

          let result;
          try {
                  const match = text.match(/\{[\s\S]*\}/);
                  result = JSON.parse(match ? match[0] : text.trim());
          } catch {
                  result = { main: '😐', emojis: ['😐','🤔','😶'], labels: ['נייטרלי','מהורהר','ריק'], expression: 'לא ברור' };
          }

          return res.status(200).json(result);
    } catch (err) {
          console.error('API error:', err);
          return res.status(500).json({ error: 'Analysis failed' });
    }
};
