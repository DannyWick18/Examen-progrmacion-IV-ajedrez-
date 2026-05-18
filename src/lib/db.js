//Importamos /promise que nos permite realizar async/await que se coloca antes 
// de una funcion para indicar que es asincrona y que siempre devolvera una
//  promesa (garantia de que entregara un resultado en el futuro). 
// await: nos permite esperar la respuesta

//mysql permite importar MySQL
import mysql from "mysql2/promise"; 

const pool = mysql.createPool({ //un pool es un grupo de conexiones reutilizables, reutiliza conexiones
  //Si bien obtiene el host del archivo .env.local el ponemos un or para especificar
  // que debe ser local host, esto no se hace ya que expone datos, pero para entornos controlados nos ayuda a evitar errores
  host: process.env.DB_HOST || "localhost", 

  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "chess_game",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool; //Permite usar la conexion reutilizable en otros archivos

