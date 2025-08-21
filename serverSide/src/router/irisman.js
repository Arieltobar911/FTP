import pool from "../DB/DB.js";
import http from "http";
import { Server } from "socket.io"; 

const server = http.createServer();
const io = new Server(server, {
    cors: { origin: "*" }
});

export async function getData() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT dispositivo_id, dispositivo_nombre, TDP, OS, state, alias FROM dispositivos");
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    } finally {
        if (conn) conn.release();
    }
}

// Cuando un cliente se conecta
io.on("connection", async (socket) => {
    const devices = await getData(); 
    socket.emit("initDevices", devices);

    const interval = setInterval(async () => {
        const tdpData = await getData();

        io.emit("devices-updated", tdpData.map(d => ({
            id: d.dispositivo_id,  
            TDP: d.TDP,
            state: d.state,
            alias: d.alias
        })));
    }, 1000);

    socket.on("disconnect", () => {
        clearInterval(interval);
    });
});

// Exportamos io para poder iniciar el servidor si es necesario
export default io;
