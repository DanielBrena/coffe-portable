function guardar_pedido(nombre,base){
	var fecha = new Date();

	if(nombre != ''){
		base.transaction(function(t){
			var sql = "INSERT INTO pedido (nombre,fecha,pagado)";
				sql += "VALUES (?,?,?)";
			t.executeSql(sql,
				[nombre,fecha.getDate() + "-" + fecha.getMonth() +1 + "-" +fecha.getFullYear(),"0"]
			);
		});
	}else{
		alert("Algunos campos son necesarios");
	}
}
function mostrar_pedidos(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM pedido",[],function(t,resultado){
			
			$("#lista_productos").empty();

			for(var i = 0; i < resultado.rows.length; i++){
				$("#lista").append("<li data-id='"+resultado.rows.item(i).id+"' >"+resultado.rows.item(i).nombre+"</li> ");
				
			}

			//index
			$("#lista li").on("click",function(){
				$("#pedido_id").val(  $(this).attr("data-id") );
			});

		}); 
	});
}
