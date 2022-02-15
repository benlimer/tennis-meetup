/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("matches", (table) => {
        table.bigIncrements("id")
        table.string("type").notNullable()
        table.string("result")
        table.string("date").notNullable()
        table.integer("userIdOne").notNullable().index().unsigned().references("users.id")
        table.integer("userIdTwo").notNullable().index().unsigned().references("users.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("matches")
}
