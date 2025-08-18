import mariadb  # o import mysql.connector si usaste el otro

try:
    conn = mariadb.connect(
        user="tu_usuario",
        password="tu_contraseña",
        host="localhost",
        port=3306,
        database="tu_base_de_datos"
    )
    print("Conexión exitosa a MariaDB!")
except mariadb.Error as e:
    print(f"Error conectando a MariaDB: {e}")


