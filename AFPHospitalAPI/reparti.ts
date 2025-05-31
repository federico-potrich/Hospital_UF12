
import * as mysql from 'mysql2/promise';
import { createHttpResponceKO, createHttpResponceOK } from './ResponceManager';

// import { process } from 'node:process'

// npm i -D @types/node
const dbConfig = {
    host: "localhost",
    user: "root",       // Cambia se necessario
    password: "root",       // Cambia se necessario
    database: "ospedale",
    port: 3306,
};

export const listaRep = async () => {
    let connection;

    try {
        // Connesione al DB
        connection = await mysql.createConnection(dbConfig);

        // Eseguiamo la query
        const [row] = await connection.execute(`
            SELECT 
                r.id as id_reparto,
                r.nome,
                r.descrizione
            FROM Reparto r
        `);

        return createHttpResponceOK(row);
    } catch (error) {
        return createHttpResponceKO(error);
    } finally{
        connection.end();
    }
};