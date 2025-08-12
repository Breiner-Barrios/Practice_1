import express from 'express'
import { pool } from './server/connection.js';
import { setupRoutes } from './routes/routes.js';
import { createApiViewIfNotExist, loanViewQuery } from './server/views.SQL.js';


const app = express();
app.use(express.json())

const PORT= 3000;





(async () => {  
    //EL PRIMER PARAMETRO ES EL NOMBRE Y LO QUE DEBERIA IR EN EL GET
    try {
        await createApiViewIfNotExist('Viewloan', loanViewQuery);
    } catch (error) {
        console.error('No se pudo iniciar la aplicación debido a un error de base de datos.');
        process.exit(1);
    };

    // Configura todas las rutas pasando la instancia de express(app) y el pool de conexiones
    setupRoutes(app, pool);

    app.listen(PORT, ()=>{
        console.log(`Server running at http://localhost:${PORT}`);
        //aqui iria otro endpoint
    })
})(); //pendiente a los parentesis
