import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import db from '../data/db';


dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Inicializa a conexão com o banco de dados
db().then(() => console.log('Banco de dados inicializado com sucesso.'));


// Configura as rotas
app.use('/api', routes);

// Middleware global para tratamento de erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR', error_description: 'Erro interno do servidor' });
});

// Rota de saúde para verificar se a aplicação está rodando
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
