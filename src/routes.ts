import { Router, Request, Response } from 'express';
import uploadImage from './controllers/uploadController';
import confirmMeasure from './controllers/confirmController';
import { validateUploadRequest, validateConfirmRequest } from './middlewares/validationMiddleware';

const router = Router();

interface Params {
    customer_code: string;
  }

// POST /upload - Recebe uma imagem, consulta a API Gemini e retorna a medida lida
router.post('/upload', validateUploadRequest, uploadImage);

// Rota para confirmar
router.patch('/confirm', validateConfirmRequest, confirmMeasure);

// GET /<customer_code>/list - Lista as medidas realizadas por um determinado cliente
router.get('/:customer_code/list', async (req: Request<Params>, res: Response) => {
    const { customer_code } = req.params; // O TypeScript agora sabe que customer_code é uma string
    try {
      const measures = await (req.query.measure_type as string);
      if (!measures || measures.length === 0) {
        return res.status(404).json({ error_code: 'MEASURES_NOT_FOUND', error_description: 'Nenhuma leitura encontrada' });
      }
      res.status(200).json({ customer_code, measures });
    } catch (error) {
      res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR', error_description: 'Erro interno do servidor' });
    }
  });

export default router;
