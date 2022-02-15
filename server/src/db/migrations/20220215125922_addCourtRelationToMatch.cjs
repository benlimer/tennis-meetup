/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("matches", (table) => {
        table.integer("courtId").index().unsigned().references("courts.id")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("matches", (table) => {
        table.dropColumn("courtId")
    })
}
