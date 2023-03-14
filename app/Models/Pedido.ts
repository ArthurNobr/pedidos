const Model = use('Model')

class Pedido extends Model {
  static get table (){
    return 'Pedidos'
  }

  items() {
    return this.hasMany('App/Models/PedidosItem')
  }
}

module.exports = Pedido
