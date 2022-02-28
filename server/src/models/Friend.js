const Model = require('./Model.js')

class Friend extends Model{
  static get tableName(){
    return 'friends'
  }

  static get idColumn() {
    return ["baseUserId" , "counterUserId"]
  }
}

module.exports = Friend