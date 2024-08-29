import { knex } from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/db.sqlite' // Caminho para o arquivo SQLite
  },
  useNullAsDefault: true, // Recomendado para evitar erros em SQLite
});

export default db;
