//Basicamente este archivo conecta el backend con el fronted y endpoint
// Un endpoint es una URL del backend que recibe peticione, recibe datos, procesarlos, reponder algo

//Importamos el controlador
import { loginController } from "../../../../controllers/authController";

//Exportamos la funcion como POST que es mucho mas seguro 
export async function POST(req) { //req hace referencia a la peticion del cliente
    return loginController(req); //Le pasa toda la request al controller.
}