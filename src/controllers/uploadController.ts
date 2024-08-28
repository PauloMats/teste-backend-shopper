import { Request, Response } from 'express';

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

  // Aqui, você integraria a API Gemini para processar a imagem
  // Vamos simular essa parte por enquanto

  // Simulação de resposta da API Gemini
  const fakeResponse = {
    image_url: "https://fakeurl.com/fakeimage.png",
    measure_value: 1234,
    measure_uuid: "fake-uuid-1234"
  };

  return res.status(200).json(fakeResponse);
};

export default uploadImage;