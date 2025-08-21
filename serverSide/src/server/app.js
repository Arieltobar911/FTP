import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import router from "../router/router.js";
import http from "http";
import io from "../router/irisman.js";

// Configuraciones iniciales
const app = express();
const server = http.createServer(app); // servidor HTTP

io.attach(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creador de sesion
app.use(session({
    secret: "secretUser",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }
}));

//Ajustes
app.set('views', path.join(__dirname, '../views')); // ubicacion de los esqueletos de pagina
app.set('view engine', 'ejs'); // ejs en este caso, un html con logica js incluida
app.use(express.static(path.join(__dirname, '../public'))); // ubicacion de los estilos (.js, .css)

app.use('/', router);// invoca las rutas

app.get("/", (req, res) => {
    res.redirect("/create"); // predeterminadamente empieza en create
});

// inicia el server
server.listen(3000, ()=>{console.log('Servidor corriendo en http://localhost:3000');});