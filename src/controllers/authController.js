import { loginUser } from "../services/authService";
import { serialize } from "cookie";

export const loginController = async (req) => {

    const body = await req.json();

    const { email, password } = body;

    try {

        const token = await loginUser(email, password);

        const cookie = serialize(
            "token",
            token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24,
            }
        );

        return new Response(
            JSON.stringify({
                message: "Login exitoso",
            }),
            {
                status: 200,
                headers: {
                    "Set-Cookie": cookie,
                    "Content-Type": "application/json",
                },
            }
        );

    } catch (error) {

        return new Response(
            JSON.stringify({
                error: error.message,
            }),
            {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
};