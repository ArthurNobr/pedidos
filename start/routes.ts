import Route from '@ioc:Adonis/Core/Route'
import PedidosController from 'App/Controllers/Http/PedidosController'

Route.group(() => {
  Route.post('/pedidos', PedidosController.estoque)
  Route.get('/pedidos/:id', PedidosController.mostrar)
  Route.get('/pedidos', PedidosController.index)
  Route.put('/pedidos/:id', PedidosController.atualizar)
  Route.delete('/pedidos/:id', PedidosController.delete)
})
