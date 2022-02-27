/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("messages", (table) => {
        table.bigIncrements("id")
        table.string("text").notNullable()
        table.string("author").notNullable()
        table.integer("senderId").notNullable().index().unsigned().references("users.id")
        table.integer("receiverId").notNullable().index().unsigned().references("users.id")
        table.integer("chatId").notNullable().index().unsigned().references("chats.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("messages")
}
