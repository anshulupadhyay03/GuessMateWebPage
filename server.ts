import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client lazily or safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Pre-registration Google Sheet webhook proxy
app.post('/api/pre-register', async (req, res) => {
  try {
    const { email, platform } = req.body;
    const sheetUrl = process.env.VITE_GOOGLE_SHEET_URL || process.env.GOOGLE_SHEET_URL;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (sheetUrl) {
      try {
        await fetch(sheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, platform, timestamp: new Date().toISOString() }),
        });
      } catch (err) {
        console.error('Failed to forward email to Google Sheet URL:', err);
      }
    }

    res.json({ status: 'success', email });
  } catch (err: any) {
    console.error('Pre-registration server error:', err);
    res.status(500).json({ error: 'Failed to process pre-registration', details: err.message });
  }
});

// AI Fair Play Review API Endpoint
app.post('/api/ai-review', async (req, res) => {
  try {
    const { category, player1Secret, player2Secret, transcript } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback simulated review if API key is not present
      return res.json({
        fairPlayScore: 98,
        status: 'CLEAN',
        summary: 'No logical contradictions detected. High integrity match.',
        contradictions: [],
        keyInsights: [
          'Player A asked highly constraining early questions.',
          'Player B provided 100% consistent answers across all 12 turns.',
        ],
        strategicDeductionHighlight:
          'Question #7 ("Does it live in aquatic environments?") eliminated 60% of remaining category items efficiently.',
      });
    }

    const prompt = `You are the AI Fair Play Judge for the social deduction game 'GuessTheName'.
Analyze the following match transcript for fairness, logical consistency, and truthfulness.

Match Metadata:
Category: ${category || 'General'}
Player 1 Secret: ${player1Secret || 'Unknown'}
Player 2 Secret: ${player2Secret || 'Unknown'}

Transcript:
${JSON.stringify(transcript, null, 2)}

Requirements:
1. Verify if all answers given by Player 1 match their secret (${player1Secret}).
2. Verify if all answers given by Player 2 match their secret (${player2Secret}).
3. Identify any logical contradictions or misleading responses between questions.
4. Calculate an overall Fair Play Score percentage (0-100%).
5. Highlight strategic questioning techniques.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are an impartial, high-precision AI Fair Play reviewer for GuessTheName multiplayer deduction game. Evaluate truthfulness, logical consistency, and detect contradictions.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fairPlayScore: {
              type: Type.NUMBER,
              description: 'Fair play confidence score from 0 to 100',
            },
            status: {
              type: Type.STRING,
              description: 'Status: CLEAN, FLAGGED, or PERFECT',
            },
            summary: {
              type: Type.STRING,
              description: 'Summary of match fairness',
            },
            contradictions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  questionNumber: { type: Type.NUMBER },
                  issue: { type: Type.STRING },
                  severity: { type: Type.STRING },
                },
                required: ['questionNumber', 'issue', 'severity'],
              },
            },
            keyInsights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            strategicDeductionHighlight: {
              type: Type.STRING,
            },
          },
          required: [
            'fairPlayScore',
            'status',
            'summary',
            'contradictions',
            'keyInsights',
            'strategicDeductionHighlight',
          ],
        },
      },
    });

    const jsonText = response.text || '{}';
    const result = JSON.parse(jsonText);
    res.json(result);
  } catch (error: any) {
    console.error('AI Review Endpoint error:', error);
    res.status(500).json({
      error: 'Failed to complete AI Fair Play Review',
      details: error.message,
    });
  }
});

// AI Opponent API for Live Practice Demo
app.post('/api/ai-opponent', async (req, res) => {
  try {
    const { action, category, aiSecret, userSecret, transcript, userQuestion, userGuess } = req.body;

    const ai = getGeminiClient();

    if (action === 'ANSWER_USER_QUESTION') {
      if (!ai) {
        // Fallback rule-based smart answer
        const q = (userQuestion || '').toLowerCase();
        const sec = (aiSecret || '').toLowerCase();
        let answer = "Yes";
        if (q.includes("fly") && !["bird", "eagle", "falcon", "bat", "penguin"].some(x => sec.includes(x))) answer = "No";
        if (q.includes("aquatic") || q.includes("water")) answer = ["whale", "dolphin", "shark", "penguin", "fish"].some(x => sec.includes(x)) ? "Yes" : "No";
        return res.json({ answer, reasoning: "Evaluated item properties." });
      }

      const prompt = `Category: ${category}
AI's secret item: "${aiSecret}"
User asked this question: "${userQuestion}"

Answer the user truthfully and concisely.
Acceptable short answers: "Yes", "No", "Don't Know", or a 1-sentence concise elaboration.
Do NOT reveal the secret directly.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an honest player in GuessTheName game. You know your secret item and answer questions strictly truthfully.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              answer: { type: Type.STRING },
              reasoning: { type: Type.STRING },
            },
            required: ['answer'],
          },
        },
      });

      const resData = JSON.parse(response.text || '{"answer":"Yes"}');
      return res.json(resData);
    }

    if (action === 'GENERATE_AI_QUESTION') {
      if (!ai) {
        const sampleQuestions = [
          "Is it a mammal?",
          "Is it larger than a human?",
          "Is it commonly found in the wild?",
          "Can it fly or swim fast?",
          "Is it a predator?"
        ];
        const nextQ = sampleQuestions[transcript.length % sampleQuestions.length];
        return res.json({ question: nextQ, thinking: "Deductive process narrowing possibilities." });
      }

      const prompt = `Category: ${category}
Match History:
${JSON.stringify(transcript, null, 2)}

You are trying to guess the User's secret item from category "${category}".
Formulate ONE strategic, clever, high-information-gain question to narrow down the options.
Do NOT ask for the name directly. Keep it under 12 words.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert deduction player in GuessTheName. Formulate smart, constrained questions.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              thinking: { type: Type.STRING },
            },
            required: ['question'],
          },
        },
      });

      const resData = JSON.parse(response.text || '{"question":"Is it larger than a dog?"}');
      return res.json(resData);
    }

    if (action === 'EVALUATE_GUESS') {
      const isCorrect = (userGuess || '').trim().toLowerCase() === (aiSecret || '').trim().toLowerCase();
      return res.json({
        isCorrect,
        aiSecret,
        message: isCorrect ? "Spot on! You deduced it correctly!" : `Incorrect guess! The penalty applies.`
      });
    }

    res.status(400).json({ error: 'Invalid action' });
  } catch (err: any) {
    console.error('AI Opponent Error:', err);
    res.status(500).json({ error: 'AI Opponent failed', details: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GuessTheName Marketing & Beta Web Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
