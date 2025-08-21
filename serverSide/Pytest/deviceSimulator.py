import mariadb as DB
import random as XD
import time as clock

def connect():
    try:
        conn = DB.connect(
            user="ariel",
            password="papu",
            host="192.168.100.10",
            port=3307,
            database="EcoDEV"
        )
        return conn
    except DB.Error as e:
        print(f"Error conectando a MariaDB: {e}")
        return None

def deviceUP(tdp, tdp2, tdp3):
    try:
        conn = connect() 
        cursor = conn.cursor()
        cursor.execute("UPDATE dispositivos SET TDP = %s WHERE dispositivo_id = %s", (tdp, 1))
        cursor.execute("UPDATE dispositivos SET TDP = %s WHERE dispositivo_id = %s", (tdp3, 2))
        cursor.execute("UPDATE dispositivos SET TDP = %s WHERE dispositivo_id = %s", (tdp2, 3))
        conn.commit()
        print(F"\nCambio exitoso En el Dispositivo 1, el TDP actual es: {tdp}")
        print(F"Cambio exitoso En el Dispositivo 2, el TDP actual es: {tdp2}")
        print(F"Cambio exitoso En el Dispositivo 3, el TDP actual es: {tdp3}")
    except Exception as e:
        print("Error de Actualizacion: ", str(e)) 
    finally:
        cursor.close()
        conn.close()

while True:
    num2 = XD.randint(30, 60)
    num3 = XD.randint(25, 35)
    num = XD.randint(25, 35)
    deviceUP(num, num2, num3)
    clock.sleep(1)



