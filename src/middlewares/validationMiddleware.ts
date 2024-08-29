import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// Schema de validação para o endpoint /upload
const uploadSchema = z.object({
  image: z.string().nonempty("A imagem é obrigatória").refine((val) => isValidBase64(val), "Imagem inválida, não está em base64"),
  customer_code: z.string().nonempty("O código do cliente é obrigatório"),
  measure_datetime: z.string().nonempty("A data e hora da medição são obrigatórias").refine((val) => isValidDate(val), "Data/hora inválida"),
  measure_type: z.enum(["WATER", "GAS"], {
    errorMap: () => ({ message: "O tipo de medição deve ser WATER ou GAS" }),
  }),
});

// Schema de validação para o endpoint /confirm
const confirmSchema = z.object({
  measure_uuid: z.string().nonempty("O UUID da medição é obrigatório"),
  confirmed_value: z.number().int("O valor confirmado deve ser um número inteiro").positive("O valor confirmado deve ser positivo"),
});

// Função para validar se uma string é uma data válida
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

// Função para validar se uma string é um base64 válido
function isValidBase64(str: string): boolean {
  try {
    return Buffer.from(str, 'base64').toString('base64') === str;
  } catch (error) {
    return false;
  }
}

// Middleware para validação de requisição no endpoint /upload
export const validateUploadRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    uploadSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error_code: 'INVALID_DATA', error_description: error.errors.map(e => e.message).join(', ') });
    }
    next(error);
  }
};

// Middleware para validação de requisição no endpoint /confirm
export const validateConfirmRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    confirmSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error_code: 'INVALID_DATA', error_description: error.errors.map(e => e.message).join(', ') });
    }
    next(error);
  }
};
