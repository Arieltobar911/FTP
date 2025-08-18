import mariadb from 'mariadb';

const pool  = mariadb.createPool({
  host: "localhost", 
  user: "root",
  password: "2008",
  database: "EcoDEV",
  port: 3307,
  connectionLimit: 5
});

export default pool;

// uso de MariaDB en lugar de MySQL, por temas de rendimiento