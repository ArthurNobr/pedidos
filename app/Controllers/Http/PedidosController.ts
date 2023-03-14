export default class PedidosController {

  public async index ({ response }){
    const pedido = await Pedido.query().with('itens').fetch()
    response.json(pedido)
  }

  public async criar({ request, response }){
    const [ itens, ...data ] = request.only(['cliente_nome', 'cliente_email', 'valor_total', 'itens'])
    const pedido = await Pedido.criar(data)

    if (itens && itens.length){
      await pedido.itens().createMany(itens)
      await pedido.load('itens')
    }

    response.status(201).json(pedido)
  }

  public async mostrar({ params, response }){
    const pedido = await Pedido.query().with('itens').where('id', params.id).firstOrFail()

    if(!pedido) {
      return response.status(404).json()
    }

    await pedido.load('itens')
    response.json(pedido)
  }

  public async atualizar({ params, request, response }){
    const { itens, ...data } = request.only(['cliente_nome', 'cliente_email', 'valor_total', 'itens'])
    const pedido = await Pedido.query().where('id', params.id).firstOrFail()

    pedido.merge(data)
    await pedido.save()

    if (itens && itens.length) {
      await pedido.itens.delete()
      await pedido.itens.createMany(itens)
      await pedido.load('itens')
    }

    response.json(pedido)
  }

  public async delete ({ params, response }){
    const pedido = await Pedido.query().where('id', params.id).firstOrFail()

    if(!pedido){
      return response.status(404).json()
    }

    await pedido.itens.delete()
    await pedido.delete()
    response.status(204).send()
  }

  public async pago ({ params, response }){
    const pedido = await Pedido.query().where('id', params.id, 'itens', params.itens).firstOrFail()

    if(!pedido) {
      return response.status(404).json()
    }

    return true
  }
}
