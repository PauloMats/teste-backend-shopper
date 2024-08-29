import { Request, Response } from 'express';
import knex from 'knex';
import knexConfig from '../../knexfile';

const db = knex(knexConfig);

export const confirmMeasure = async (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;

  // Validar os parâmetros recebidos
  if (!measure_uuid || !confirmed_value) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "UUID da leitura ou valor confirmado faltando."
    });
  }

  try {
    // Verificar se a leitura existe
    const existingMeasure = await db('measurements')
      .where('measure_uuid', measure_uuid)
      .first();

    if (!existingMeasure) {
      return res.status(404).json({
        error_code: "MEASURE_NOT_FOUND",
        error_description: "Leitura não encontrada."
      });
    }

    // Verificar se a leitura já foi confirmada
    if (existingMeasure.has_confirmed) {
      return res.status(409).json({
        error_code: "CONFIRMATION_DUPLICATE",
        error_description: "Leitura já confirmada."
      });
    }

    // Atualizar o valor e marcar como confirmado
    await db('measurements')
      .where('measure_uuid', measure_uuid)
      .update({
        measure_value: confirmed_value,
        has_confirmed: true
      });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao confirmar a leitura:", error);
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Erro ao confirmar a leitura."
    });
  }
};
