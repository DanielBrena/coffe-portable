function Producto(id,nombre, precio,fecha,existe){
	this.id = id;
	this.nombre = nombre;
	this.precio = precio;
	this.fecha = fecha;
	this.existe = existe;
}

$(document).ready(function(){
	// var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);
	// var sql = "CREATE TABLE IF NOT EXISTS producto(id integer primary key ";
	// 	sql += "autoincrement,nombre,precio,fecha,sexo)";
	// base.transaction(function(t){
	// 	t.executeSql(sql);
	// });

	mostrar(base);
	
	$("#guardar").click(function(){
		guardar(objeto(),base);
		mostrar(base);
		limpiar();
	});

	$("#actualizar").click(function(){
		actualizar(objeto(),base);
		limpiar();
		mostrar(base);
		
	});

	$("#cancelar").click(function(){
		limpiar();
		$("#guardar").css("display","block");
		$("#actualizar").css("display","none");
		$("#cancelar").css("display","none");
	});
	
});


function objeto(){
	var producto = new Producto(

		parseInt($("#id").val()),
		$("#nombre").val(),
		$("#precio").val(),
		$("#fecha").val(),
		$("#existe").val()
		);
	return producto;
}


function guardar(producto,base){
	if(producto.nombre != '' && producto.precio != '' && producto.fecha != ''){
		base.transaction(function(t){
			var sql = "INSERT INTO producto (nombre,precio,fecha,existe)";
				sql += "VALUES (?,?,?,?)";
			t.executeSql(sql,
				[producto.nombre,producto.precio,producto.fecha,producto.existe]
			);
		});
	}else{
		alert("Algunos campos son necesarios");
	}
}
function eliminar(id, base){
	base.transaction(function(t){
			t.executeSql("DELETE FROM producto WHERE id =" +id);
		});
}

function actualizar(producto,base){
	base.transaction(function(t){
		var sql = "UPDATE producto SET nombre = ?,precio = ?,";
			sql +="fecha = ?,existe = ? WHERE id = ?";
			t.executeSql(sql,
				[producto.nombre,producto.precio,producto.fecha,producto.existe,producto.id]
			);
		});
}

function mostrarId(id, base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM producto WHERE id="+id,[],function(t,resultado){
			$("#id").val(resultado.rows.item(0).id);
			$("#nombre").val(resultado.rows.item(0).nombre);
			$("#precio").val(resultado.rows.item(0).precio);
			$("#fecha").val(resultado.rows.item(0).fecha);
			$("#existe").empty();
			if(resultado.rows.item(0).existe == '0'){
				$("#existe").append($('<option></option>').attr('value', '0').text("No hay producto"));
		    	$("#existe").append($('<option></option>').attr('value', '1').text("Hay producto"));
			}else{
		    	$("#existe").append($('<option></option>').attr('value', '1').text("Hay producto"));
		    	$("#existe").append($('<option></option>').attr('value', '0').text("No hay producto"));
			}
		    
		});
	});
}

function mostrar_productos(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM producto",[],function(t,resultado){
			
			$("#lista_productos").empty();

			for(var i = 0; i < resultado.rows.length; i++){
				$("#lista_productos").append("<li data-id='"+resultado.rows.item(i).id+"' >"+resultado.rows.item(i).nombre+"</li> ");
				
			}

			//index
			$("#lista_productos li").on("click",function(){
				//$("#pedido_id").val(  $(this).attr("data-id") );
				alert($(this).attr("data-id"));
			});

		}); 
	});
}

function mostrar_productos_nombre(texto,base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM producto WHERE (nombre like ?)",["%"+texto+"%"],function(t,resultado){
			
			$("#lista_productos").empty();

			for(var i = 0; i < resultado.rows.length; i++){
				$("#lista_productos").append("<li data-id='"+resultado.rows.item(i).id+"' >"+resultado.rows.item(i).nombre+"</li> ");
				
			}

			//index
			$("#lista_productos li").on("click",function(){
				//$("#pedido_id").val(  $(this).attr("data-id") );
				alert($(this).attr("data-id"));
			});

		}); 
	});
}


function mostrar(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM producto",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th>Id</th>"+
					"<th>Nombre</th>"+
					"<th>Precio</th>"+
					"<th>Fecha Nacimiento</th>"+
					"<th>Existe</th>"+
					"<th>Modificar</th>"+
					"<th>Eliminar</th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr>";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).precio + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).fecha + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).existe + "</td>";
					cuerpo += "<td><spam class='modificar' data-modificar='"+resultado.rows.item(i).id +"'>O</spam></td>";
					cuerpo += "<td><spam  class='eliminar' data-eliminar='"+resultado.rows.item(i).id +"'>X</spam></td>";
					cuerpo += "</tr>";
			}
			$("#productos").html(cabecera + cuerpo);
			$('.eliminar').click(function(){
				var confirmar = confirm("¿Desea eliminar?");
				if(confirmar == 1){
					eliminar($(this).attr('data-eliminar'),base);
					mostrar(base);
				}
			});

			$('.modificar').click(function(){
				
				mostrarId($(this).attr('data-modificar'),base);
				$("#guardar").css("display","none");
				$("#actualizar").css("display","block");
				$("#cancelar").css("display","block");
			});

		}); 
	});
}

function limpiar(){
	$("#id").val(''),
	$("#nombre").val(''),
	$("#precio").val(''),
	$("#fecha").val(''),
	llenar_existe();
}

function llenar_existe(){
	$("#existe").empty();
    $("#existe").append($('<option></option>').attr('value', '0').text("No existe producto"));
    $("#existe").append($('<option></option>').attr('value', '1').text("Hay producto"));
}