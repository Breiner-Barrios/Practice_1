//este ejecuta los load

import { uploadUser } from "./loadUser.js";
import { uploadBooks } from "./loadBooks.js";
import { uploadloans } from "./loadprestamos.js";

(async () => {
    try {
        console.log('🚀 Iniciando seeders...');

        await uploadUser();
        await uploadBooks();
        await uploadloans();
        console.log(' Todos los seeders ejecutados correctamente.');
    } catch (error) {
        console.error(' Error ejecutando los seeders:', error.message);
    } finally {
        process.exit();
    }
})()