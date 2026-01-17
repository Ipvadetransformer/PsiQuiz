
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Gere 3 perguntas de múltipla escolha sobre o seguinte tópico de psicologia: ${topic}. 
    As perguntas devem ser educativas e desafiadoras. Retorne em formato JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER, description: 'Índice de 0 a 3 da resposta correta' },
            explanation: { type: Type.STRING, description: 'Uma breve explicação de por que a resposta está correta' }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};

export const getAIFeedback = async (userAnswer: string, context: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Como um tutor especialista em psicologia, responda à seguinte dúvida/comentário do aluno: "${userAnswer}". Contexto do módulo: "${context}". Seja encorajador e forneça insights baseados em evidências científicas.`,
  });
  return response.text || "Desculpe, não consegui processar seu feedback agora.";
};

export const startClinicalRoleplay = async (caseDescription: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Vamos fazer um roleplay. Eu sou um estudante de psicologia e você é um paciente apresentando os seguintes sintomas: ${caseDescription}. 
    Comece a conversa como o paciente, de forma natural. Aguarde minha análise clínica.`,
    config: {
        thinkingConfig: { thinkingBudget: 4000 }
    }
  });
  return response.text || "Olá, doutor(a)... como posso começar?";
};
