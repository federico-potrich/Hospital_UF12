// const mysql = require('mysql2/promise');
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

export const listaPz = async () => {
    let connection;

    try {
        // Connesione al DB
        connection = await mysql.createConnection(dbConfig);

        // Eseguiamo la query
        const [row] = await connection.execute(`
            SELECT 
                p.id as id_paziente,
                p.codice,
                p.codice_colore,
                p.stato,
                r.id as id_reparto,
                r.nome as nome_reparto,
                r.descrizione,
                a.id as id_anagrafica,
                a.nome,
                a.cognome,
                a.data_nascita,
                a.codice_fiscale
            FROM Paziente p 
            JOIN Reparto r ON p.reparto_id = r.id
            JOIN Anagrafica a ON p.anagrafica_id = a.id;
        `);

        return createHttpResponceOK(row);
    } catch (error) {
        return createHttpResponceKO(error);
    } finally {
        connection.end();
    }
};

export const storiaPz = async (event) => {
    let connection;

    try {
        // Connesione al DB
        connection = await mysql.createConnection(dbConfig);
        let pathParam = event.pathParameters;

        if (!pathParam['paziente_id']) {
            throw new Error("Non è stato trovato il parametro 'ID'");
        }

        let paziente_id = pathParam['paziente_id']
        // Eseguiamo la query
        const [row] = await connection.execute(`
            SELECT 
    cc.id AS cartella_id,
    cc.data_creazione,
    cc.fase,
    cc.diagnosi,
    cc.trattamento,
    cc.note,
    
    p.codice AS codice_paziente,
    p.codice_colore,
    p.stato,
    
    a.nome AS nome_paziente,
    a.cognome AS cognome_paziente,
    a.data_nascita,
    a.codice_fiscale,

    r.nome AS reparto,
    
    m.specializzazione,
    am.nome AS nome_medico,
    am.cognome AS cognome_medico,

    ai.nome AS nome_infermiere,
    ai.cognome AS cognome_infermiere

FROM CartellaClinica cc
LEFT JOIN Paziente p ON cc.paziente_id = p.id
LEFT JOIN Anagrafica a ON p.anagrafica_id = a.id
LEFT JOIN Reparto r ON p.reparto_id = r.id
LEFT JOIN Medico m ON cc.medico_id = m.id
LEFT JOIN Anagrafica am ON m.anagrafica_id = am.id
LEFT JOIN Infermiere i ON cc.infermiere_id = i.id
LEFT JOIN Anagrafica ai ON i.anagrafica_id = ai.id
	having codice_paziente = ?
;`,[paziente_id]);

        return createHttpResponceOK(row);
    } catch (error) {
        return createHttpResponceKO(error);
    } finally {
        connection.end();
    }
};


export const accettaPz = async (event) => {
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);

        if (!event.body) {
            throw new Error("Non è stato passato il paziente nel body della richiesta");
        }

        const pzTmp = JSON.parse(event.body.trim());

        // Prima verifichiamo se il codice fiscale è già presente
        const [existing] = await connection.execute(`
            SELECT id FROM Anagrafica WHERE codice_fiscale = ?
        `, [pzTmp.codiceFiscale]);

        let pzNewID;

        if (existing.length > 0) {
            // Codice fiscale già presente
            pzNewID = existing[0].id;
        } else {
            // Inserisci nuovo record
            const [pzCreation] = await connection.execute(`
                INSERT INTO Anagrafica (nome, cognome, data_nascita, codice_fiscale)
                VALUES (?, ?, ?, ?)
            `, [pzTmp.nome, pzTmp.cognome, new Date(pzTmp.dataNascita), pzTmp.codiceFiscale]);

            pzNewID = pzCreation.insertId;
        }

        // Ora inseriamo nella tabella Paziente
        const [newPazient] = await connection.execute(`
            INSERT INTO Paziente (anagrafica_id, reparto_id, codice, codice_colore, stato)
            VALUES (
                ?, 
                (SELECT id FROM Reparto WHERE nome = 'Pronto Soccorso' LIMIT 1), 
                ?, ?, ?
            );
        `, [pzNewID, pzTmp.codice, pzTmp.codiceColore, pzTmp.stato]);
        
        //da modificare body
        await connection.execute(`
            INSERT INTO CartellaClinica (paziente_id, medico_id, diagnosi, trattamento, fase, note)
            VALUES (
                ?, ?,
                ?,
                ?,
                'TRIAGE',
                ?
            );
        `, [pzNewID, pzTmp.medicoID, pzTmp.diagnosi, pzTmp.trattamento, , pzTmp.note]);

        


        return createHttpResponceOK({
            messaggio: "Creato Paziente",
            pzID: newPazient.insertId
        });

    } catch (error) {
        return createHttpResponceKO(error);
    } finally {
        if (connection) await connection.end();
    }
};


export const trasferisciPz = async (event) => {
    let connection;

    try {
        // Connesione al DB
        connection = await mysql.createConnection(dbConfig);
        // pathParameters: { id: 'CIAO23' },

        console.log(event);

        if (!event.pathParameters) {
            throw new Error("Non è stato passato il paziente nel PARAMETRO della richiesta");
        }

        let pathParam = event.pathParameters;

        if (!pathParam['reparto_id']) {
            throw new Error("Non è stato trovato il parametro 'ID'");
        }
        if (!pathParam['paziente_id']) {
            throw new Error("Non è stato trovato il parametro 'ID'");
        }
        let reparto_id = pathParam['reparto_id']
        let paziente_id = pathParam['paziente_id']

        const [updatedPazient] = await connection.execute(`
            UPDATE Paziente p 
            SET stato = 'TRASFERITO', reparto_id = ? 
            WHERE p.id = ?;
        `, [reparto_id, paziente_id]);

        return createHttpResponceOK({
            messaggio: updatedPazient.info,
            affectedRows: updatedPazient.affectedRows
        });

    } catch (error) {
        return createHttpResponceKO(error);
    } finally {
        connection.end();
    }
};

export const dimettiPz = async (event) => {
    let connection;

    try {
        // Connesione al DB
        connection = await mysql.createConnection(dbConfig);
        // pathParameters: { id: 'CIAO23' },

        console.log(event);

        if (!event.pathParameters) {
            throw new Error("Non è stato passato il paziente nel PARAMETRO della richiesta");
        }

        let pathParam = event.pathParameters;
        if (!pathParam['id']) {
            throw new Error("Non è stato trovato il parametro 'ID'");
        }

        const [dismissedPazient] = await connection.execute(`
            UPDATE Paziente p 
            SET stato = 'DIMESSO', reparto_id = NULL 
            WHERE p.id = ?;
        `,
            [pathParam['id']]);

        return createHttpResponceOK({
            messaggio: dismissedPazient.info,
            affectedRows: dismissedPazient.affectedRows
        });

    } catch (error) {
        return createHttpResponceKO(error);
    } finally {
        connection.end();
    }
};