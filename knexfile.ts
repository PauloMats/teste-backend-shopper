import type { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './data/db.sqlite'
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/migrations'
  },
  seeds: {
    directory: './src/seeds',
  },
};

export default config;
