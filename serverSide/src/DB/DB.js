import mariadb from 'mariadb';

const pool  = mariadb.createPool({
  host: "192.168.100.10", // Poner ip de la maquina host
  user: "ariel",
  password: "papu",
  database: "EcoDEV",
  port: 3307,
  connectionLimit: 5
});

export default pool;

// uso de MariaDB en lugar de MySQL, por temas de rendimiento