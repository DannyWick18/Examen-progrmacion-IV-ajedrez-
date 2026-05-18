import bcrypt from "bcryptjs"; //LIbreria para encriptar y comparar passwords
import { findUserByEmail } from "../repositories/userRepository"; //Importamos el archivo que habla con MySQL
import { generateToken } from "../lib/jwt"; //Importamos la funcion que crea el JWT, necesario para guardar informacion del usuario

//Exportamos la funcion para poder usuarla en otros archivos 
//Recibimos dos parametros del fronted email y password
export const loginUser = async (email, password) => { //Ralizamos la funcion para contultas a db y bcrypt.compare

    const user = await findUserByEmail(email); //Buscamos el usuario con ese email

    if (!user) { //Si no existe lanzamos el error de usuario no encontrado
        throw new Error("Usuario no encontrado");
    }

    //Aqui comparamos la password que recibe con el hash en la base de datos
    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) { //Si la password es incorrecta lanza un error
        throw new Error("Contraseña incorrecta");
    }

    //Si todo es correcto genera un token de datos para el usuario
    const token = generateToken(user);

    //Finalmente retornamos el token 
    return token;
};