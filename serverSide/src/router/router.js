import pool from "../DB/DB.js";
import bcrypt from "bcrypt";
import express from "express";

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/login', (req, res) => {
    res.render('login'); 
});

router.post('/create', async (req, res) => {
    const { name, password, email } = req.body;
    let Hash = await bcrypt.hash(password, 8);

    try{
        await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, Hash]
        );
        res.render('create', {
            alert: true,
            alertTitle: "Registro",
            alertMessage: "Su cuenta ha sido creada exitosamente, ahora puede iniciar sesión.",
            alertIcon: "success",
            showConfirmButton: true,
            ruta: 'login'
        });
    }catch(err){
        console.error(err);
        res.render('login', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Hubo un problema al crear el usuario",
            alertIcon: "error",
            showConfirmButton: true,
            ruta: ''
        });
    }
});

router.post("/login", async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.render("login", { error: "Por favor ingresa usuario y contraseña" });
    }

    try {
        const rows = await pool.query("SELECT * FROM users WHERE name = ?", [name]);

        if (rows.length === 0) {
            return res.render("login", { error: "Usuario o contraseña incorrectos" });
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.render("login", { error: "Usuario o contraseña incorrectos" });
        }

        // Login exitoso: guardamos sesión
        req.session.loggedin = true;
        req.session.name = user.name;

        // Redirigir al index
        return res.redirect("/index");
    } catch (error) {
        console.error(error);
        return res.render("login", { error: "Error de base de datos" });
    }
});

export default router;

// bcrypt compare y hash(password, quantity) necesarios