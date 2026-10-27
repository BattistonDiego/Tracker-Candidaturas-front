export type StatusCandidatura =
  | 'candidatado'
  | 'entrevistaRH'
  | 'entrevistaTec'
  | 'ofertado'
  | 'aceita'
  | 'recusada'
  | 'semResposta'
  | 'desisti';

export type StatusApiCandidatura =
  | 'CANDIDATADO'
  | 'ENTREVISTARH'
  | 'ENTREVISTATEC'
  | 'OFERTADO'
  | 'ACEITA'
  | 'RECUSADA'
  | 'SEMRESPOSTA'
  | 'DESISTI';

export type PlataformaApi =
  | 'LINKEDIN'
  | 'GUPY'
  | 'CATHO'
  | 'INFOJOBS'
  | 'INDEED'
  | 'OUTRO'
  | 'Site da empresa'
  | 'Indicação';

export type Plataforma = PlataformaApi;

export interface CandidaturaApi {
  id: number;
  empresa: string;
  cargo: string;
  linkVaga: string | null;
  dataCandidatura: string;
  status: StatusApiCandidatura;
  tecnologias: string[];
  plataforma: PlataformaApi;
  contato: string | null;
  observacao: string | null;
}

export interface CandidaturaRequest {
  empresa: string;
  cargo: string;
  linkVaga: string | null;
  dataCandidatura: string;
  status: StatusApiCandidatura;
  tecnologias: string[];
  plataforma: PlataformaApi;
  contato: string | null;
  observacao: string | null;
}

export const STATUS_PARA_API: Record<StatusCandidatura, StatusApiCandidatura> = {
  candidatado: 'CANDIDATADO',
  entrevistaRH: 'ENTREVISTARH',
  entrevistaTec: 'ENTREVISTATEC',
  ofertado: 'OFERTADO',
  aceita: 'ACEITA',
  recusada: 'RECUSADA',
  semResposta: 'SEMRESPOSTA',
  desisti: 'DESISTI',
};

export const STATUS_DA_API: Record<StatusApiCandidatura, StatusCandidatura> = {
  CANDIDATADO: 'candidatado',
  ENTREVISTARH: 'entrevistaRH',
  ENTREVISTATEC: 'entrevistaTec',
  OFERTADO: 'ofertado',
  ACEITA: 'aceita',
  RECUSADA: 'recusada',
  SEMRESPOSTA: 'semResposta',
  DESISTI: 'desisti',
};

export const PLATAFORMAS: { valor: PlataformaApi; rotulo: string }[] = [
  { valor: 'LINKEDIN', rotulo: 'LinkedIn' },
  { valor: 'GUPY', rotulo: 'Gupy' },
  { valor: 'CATHO', rotulo: 'Catho' },
  { valor: 'INFOJOBS', rotulo: 'InfoJobs' },
  { valor: 'INDEED', rotulo: 'Indeed' },
  { valor: 'Site da empresa', rotulo: 'Site da empresa' },
  { valor: 'Indicação', rotulo: 'Indicação' },
  { valor: 'OUTRO', rotulo: 'Outro' },
];

export interface Candidatura {
  id: number;
  empresa: string;
  cargo: string;
  linkVaga?: string;
  dataCandidatura: Date;
  status: StatusCandidatura;
  tecnologias: string[];
  plataforma: PlataformaApi;
  contato?: string;
  observacao?: string;
}
