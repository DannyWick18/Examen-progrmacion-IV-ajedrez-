import bcrypt from "bcryptjs";
import { findUserByEmail } from "../repositories/userRepository";
import { generateToken } from "../lib/jwt";

export const loginUser = async (email, password) => {

    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {
        throw new Error("Contraseña incorrecta");
    }

    const token = generateToken(user);

    return token;
};