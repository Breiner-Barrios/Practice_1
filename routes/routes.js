/**¡¡¡¡¡¡LAS RUTAS ESPECIFICAS VAN PRIMERO!!!!!* */


//tal vez sea mejor exportar de a uno por si son diferentes CRUDs || EJ: setouRoutePrestamos
export const setupRoutes = (app, pool) => {

    app.get('/', async (req, res) => {
        res.send ('SERVER ON')
    })
    /* EMPEZAR A CREAR LAS RUTAS(ENDPOINTS) || OJO QUE ESTEN DENTRO DEL OBJETO*/

    app.get('/prestamos', async (req, res) => {
        //Siempre un try catch
        try {
            //constante Array desectructurado || 'rows' porque enteoria la respuesta mostrará las filas de la tabla
            const [rows]= await pool.query(
                //solicitud SQL
                `SELECT * FROM Viewloan;`
            );
            //respuesta de la BD a JSON
            res.json(rows);
        } catch (error) {
            console.error('error to obtaining a loan:', error.message);
            res.status(500).json({ message: 'Error server error to obtaining a loan.' });
        }

    });





}


