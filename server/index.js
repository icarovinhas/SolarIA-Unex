import process from 'process';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk'; // Faltava importar o SDK

// 1. Carregar as variáveis do .env logo no início
dotenv.config(); 

const app = express();

// 2. Configurar o CORS para permitir que seu front-end (Vite) acesse a API
// Se o seu Vite estiver em outra porta (ex: 5173), o cors() resolve isso.
app.use(cors()); 
app.use(express.json());

// 3. Usar a porta do .env ou a 3000 como reserva
const PORT = process.env.PORT || 3000;

// 4. Inicializar o Groq usando a chave do .env
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, 
});

async function getGroqChatCompletion(message) {
    // Corrigido para chat.completions (plural)
    return groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'Você é o SolarAI, um especialista em energia solar brasileiro. Seja prestativo e técnico.'
            },
            {
                role: 'user',
                content: message,
            },
        ],
        model: 'llama-3.3-70b-versatile',
    });
}

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "O campo message é obrigatório." });
    }

    try {
        const responseGroq = await getGroqChatCompletion(message);
        return res.json({ 
            response: responseGroq.choices[0]?.message?.content || "Sem resposta da IA." 
        });
    } catch (error) {
        console.error("Erro no Groq:", error);
        return res.status(500).json({ error: "Erro interno ao processar a mensagem." });
    }
}); // Fechamento correto da rota

app.listen(PORT, () => {
    console.log(`🚀 SolarAI Server rodando em http://localhost:${PORT}`);
});