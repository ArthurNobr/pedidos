'use strict'
const Model = use('Model')

class PedidoItens extends Model {
  static get table() {
    return 'pedido_itens'
  }

  pedido() {
    return this.belongsTo('App/Models')
  }
}

module.exports = PedidoItens
