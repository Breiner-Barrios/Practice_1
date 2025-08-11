import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
    host: 'localhost',
    database: 'biblioteca_easy',
    port: '3306',
    user: 'root',
    password: 'Qwe.123*',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});


/*----Para probar conexion---- */
// async function pruebaConexion() {
//     try {
//         const connection = await pool.getConnection();
//         console.log('Sirve');
//         connection.release();
//     } catch (error) {
//         console.error('fallo', error.message);

//     }

// }
// pruebaConexion();