export interface Paziente{
  id_paziente: number,
  codice: string,
  codice_colore: CodiceColore,
  stato: StatoPZ,
  id_reparto: number,
  nome_reparto: string,
  descrizione: string,
  id_anagrafica: number,
  nome: string,
  cognome: string,
  data_nascita: Date,
  codice_fiscale: string,
};

export interface CreazionePaziente{
  nome: string,
  cognome: string,
  dataNascita: Date,
  codiceFiscale: string,
  codice: string,
  codiceColore: CodiceColore,
  stato: StatoPZ
}

export type CodiceColore = 'BIANCO' |
'VERDE' |
'AZZURRO' |
'ARANCIONE' |
'ROSSO' |
'NON FORNITO';

export type StatoPZ = 'IN CARICO' |
'TRASFERITO' |
'DIMESSO' |
'NON FORNITO';
