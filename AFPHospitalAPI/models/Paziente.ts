export interface Paziente{
    id_paziente: number,
    codice: string,
    codice_colore: CodiceColore,
    stato: StatoPZ,
    id_reparto: number,
    nome_reparto: string,
    descrizione: string,
    id_anagrafica: number,
    nome_paziente: string,
    cognome: string,
    data_nascita: Date,
    codice_fiscale: string,
};

export interface PazienteDto{
    id: number,
    codice: string,
    codice_colore: CodiceColore | null,
    stato: StatoPZ | null
    reparto: Reparto,
    anagrafica: Anagrafica
}

export interface Reparto {
    id: number,
    nome: string,
    descrizione: string | null
};

export interface Anagrafica {
    id: number,
    nome: string,
    cognome: string,
    data_nascita: Date,
    codice_fiscale: string
};

export type CodiceColore = 'BIANCO' | 
'VERDE' |
'AZZURRO' | 
'ARANCIONE' |
'ROSSO';

export type StatoPZ = 'IN CARICO' | 
'TRASFERITO' | 
'DIMESSO';

export function pazienteToDto(pz: Paziente): PazienteDto{
    return {
        id: pz.id_paziente,
        codice: pz.codice,
        codice_colore: pz.codice_colore,
        stato: pz.stato,
        reparto: {
            id: pz.id_reparto,
            nome: pz.nome_reparto,
            descrizione: pz.descrizione
        },
        anagrafica: {
            id: pz.id_anagrafica,
            nome: pz.nome_paziente,
            cognome: pz.cognome,
            data_nascita: pz.data_nascita,
            codice_fiscale: pz.codice_fiscale
        }
    }
}