"use client";

import { useState } from "react";
import "../styles/login.css";

export default function LoginForm() {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("Login correcto");
        } else {
            setMessage(data.error);
        }
    };

    return (
        <div className="login-container">

            <form
                className="login-form"
                onSubmit={handleSubmit}
            >

                <h1>Login</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Ingresar
                </button>

                <p>{message}</p>

            </form>

        </div>
    );
}