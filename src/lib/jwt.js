import jwt from "jsonwebtoken"; //LIbreria para crear tokens JWT

//Un archivo helper JWT es un archivo donde guardas funciones
//  reutilizables relacionadas con los JSON Web Tokens (JWT).

//Funcion labda para gener tokens
export const generateToken = (user) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET no está definido en el entorno");
    }

    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        secret,
        {
            expiresIn: "1d",
        }
    );
};