import { pool } from "./connection.js";

async function createApiViewIfNotExist(viewName, selectQuery) {
    try {
        const createViewQuery = `
            CREATE OR REPLACE VIEW ${viewName} AS
            ${selectQuery};
        `;
        await pool.query(createViewQuery);
        console.log(`VIEW "${viewName}" ha sido creada o actualizada exitosamente.`);
    } catch (error) {
        console.error(` Error al crear la VIEW "${viewName}":`, error.message);
        // Si no se puede crear la VIEW, la aplicación no debería arrancar.
        process.exit(1); //Detiene el arranque (sin la vista no deberia arrancar el servidor)
    }
};

// Definen la consulta SELECT para las VIEWS

const loanViewQuery = `
SELECT u.nombre AS estudiante, 
l.titulo AS libro,
p.fecha_prestamo,
p.fecha_devolucion
FROM prestamos AS p
JOIN usuarios AS u ON p.id_usuario = u.id_usuario
JOIN libros AS l ON p.isbn = l.isbn;
`

export {
    createApiViewIfNotExist,
    loanViewQuery
}