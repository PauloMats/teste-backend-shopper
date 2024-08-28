import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('measurements', (table) => {
        table.uuid('measure_uuid').primary();
        table.string('customer_code').notNullable();
        table.datetime('measure_datetime').notNullable();
        table.string('measure_type').notNullable();
        table.boolean('has_confirmed').defaultTo(false);
        table.string('image_url');
        table.integer('measure_value');
      });
    }


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('measurements');
}

