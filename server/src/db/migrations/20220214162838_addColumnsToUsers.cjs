/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("users", (table) => {
        table.string("name").notNullable()
        table.string("location").notNullable()
        table.string("skillLevel").notNullable()
        table.string("gender")
        table.integer("age")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("users", (table) => {
        table.dropColumn("name")
        table.dropColumn("location")
        table.dropColumn("skillLevel")
        table.dropColumn("gender")
        table.dropColumn("age")
    })
}
