//estos cargan info/*--PASOS */

import fs from 'fs'; // esto se encarga de leer diferentes formatos de archivos. es de JS no hay que instalarla.
import path from 'path' //tambies es de JS El objetivo principal es evitar problemas con las diferencias entre sistemas operativos
import csv from 'csv-parser' //toca installarla "npm i csv-parser"
import { pool } from '../connection.js' //se va a necesitar el pool


export async function uploadloans() {

    const routeFile = path.resolve('server/data/03_prestamos.csv'); //pasa la ruta donde está el csv
    const loans = []; //Array vacio donde se guardaran los datos del csv
    
    //se regresa una nueva promesa
    return new Promise((resolve, reject) => {
        //Aqui se lee el csv, el push crea una matrix de array (arrys dentro de arrays) -deben ser como nombraste las cols en el csv
        // y a su vez las cols deben ser igual en el csv y en la tabla 
        fs.createReadStream(routeFile).pipe(csv({
            mapHeaders: ({ header }) => header.replace('\ufeff', '') // limpia BOM //\ufeff es el mismo para UTF-8
        }))
        .on('data',(row) => {
            //console.log('Fila leída:', row); //para comprobar que esa recibiendo row
            loans.push ([
                row.id_usuario,
                row.isbn,
                row.fecha_prestamo,
                row.fecha_devolucion,
                row.estado
            ]);
        })
        .on('end', async () =>{
            try {
                const sql = `INSERT INTO prestamos (id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado) VALUES ?`
                const [result] = await pool.query(sql, [loans]);
                
                console.log(`Data Inserted ${result.affectedRows} loans`);
                resolve(); 
                
            } catch (error) {
                console.error('error inserting loans', error.message);
                reject();
                
                
            };
        })
        .on('error', (error) => {
            console.error('Error reading CSV file loans:', error.message);
                reject(error);
        });
    });

};