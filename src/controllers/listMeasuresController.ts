import { Request, Response } from 'express';
import knex from 'knex';
import knexConfig from '../../knexfile';

const db = knex(knexConfig);

const listMeasures = async (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  // Validar o código do cliente
  if (!customer_code) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Código do cliente não fornecido."
    });
  }

  try {
    // Iniciar a query de busca
    let query = db('measurements').where('customer_code', customer_code);

    // Filtrar por tipo de medição, se fornecido
    if (measure_type) {
      const type = measure_type.toString().toUpperCase();
      if (type !== 'WATER' && type !== 'GAS') {
        return res.status(400).json({
          error_code: "INVALID_TYPE",
          error_description: "Tipo de medição não permitida."
        });
      }
      query = query.andWhere('measure_type', type);
    }

    // Executar a consulta
    const measures = await query.select(
      'measure_uuid',
      'measure_datetime',
      'measure_type',
      'has_confirmed',
      'image_url'
    );

    // Verificar se houve registros encontrados
    if (measures.length === 0) {
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada."
      });
    }

    // Retornar a lista de medidas
    return res.status(200).json({
      customer_code,
      measures
    });
  } catch (error) {
    console.error("Erro ao listar as medidas:", error);
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Erro ao listar as medidas."
    });
  }
};

export default listMeasures;
