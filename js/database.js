var base = openDatabase('coffe','1.0','Base de datos',10 * 1024 * 1024);

var sql_producto = "CREATE TABLE IF NOT EXISTS producto(id integer primary key ";
	sql_producto += "autoincrement,nombre,precio,fecha,existe)";
	
var sql_pedido = "CREATE TABLE IF NOT EXISTS pedido(id integer primary key ";
	sql_pedido +=  "autoincrement,nombre,fecha,pagado)";

var sql_pp = "CREATE TABLE IF NOT EXISTS pedido_has_producto(id integer primary key ";
	sql_pp += "autoincrement,pedido_id,producto_id, estado)";

	base.transaction(function(t){
		t.executeSql(sql_producto);
		
	});

	base.transaction(function(t){
		t.executeSql(sql_pedido);
		
	});

	base.transaction(function(t){
		t.executeSql(sql_pp);
		
	});


