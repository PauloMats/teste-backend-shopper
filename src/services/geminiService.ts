import axios from 'axios';

const GEMINI_API_URL = "https://api.gemini.com/v1/analyze";

export const analyzeImage = async (imageBase64: string, measureType: string) => {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      image: imageBase64,
      measure_type: measureType
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao comunicar com a API Gemini:", error);
    throw new Error("Falha na integração com o serviço de análise de imagem.");
  }
};
