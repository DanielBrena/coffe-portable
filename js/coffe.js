

$(document).ready(function(){
	mostrar_pedidos(base);
	mostrar_productos(base);

	$("#crear_pedido").click(function(){

		var pedido = prompt("Nombre del pedido");
		guardar_pedido(pedido,base);
		mostrar_pedidos(base);



	});

	$("#busqueda").keyup(function(){
		mostrar_productos_nombre( $(this).val(),base );
	});

	

	

	
})