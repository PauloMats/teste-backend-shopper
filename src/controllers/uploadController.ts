import { Request, Response } from 'express';
import analyzeImage from '../services/geminiService';

const uploadImage = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  // Validar os parâmetros recebidos
  if (!image || !customer_code || !measure_datetime || !measure_type) { 
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Todos os campos são obrigatórios."
    });
  }

  // Validar se o measure_type é válido
  if (!['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "O tipo de medição deve ser 'WATER' ou 'GAS'."
    });
  }

  // Validar se a imagem está em formato base64
  const base64Regex = /^data:image\/(png|jpeg);base64,/;
  if (!base64Regex.test(image)) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "A imagem deve estar em formato base64."
    });
  }

  // integração da API Gemini para processar a imagem
  try {

    const geminiResponse = await analyzeImage(image, measure_type);

    // Retornar a resposta da API Gemini
    return res.status(200).json({
      image_url: geminiResponse.image_url,
      measure_value: geminiResponse.measure_value,
      measure_uuid: geminiResponse.measure_uuid
    });

  } catch (error) {
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Erro ao processar a imagem."
    });
  }

}
export default uploadImage;