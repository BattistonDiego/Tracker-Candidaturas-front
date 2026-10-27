export type StatusCandidatura =
  | 'CANDIDATADO'
  | 'ENTREVISTARH'
  | 'ENTREVISTATEC'
  | 'OFERTADO'
  | 'ACEITA'
  | 'RECUSADA'
  | 'SEMRESPOSTA'
  | 'DESISTI';

export type Plataforma =
  | 'LINKEDIN'
  | 'GUPY'
  | 'CATHO'
  | 'INFOJOBS'
  | 'INDEED'
  | 'SITE_DA_EMPRESA'
  | 'INDICACAO'
  | 'OUTRO';

export const STATUS_COLUNAS: { readonly status: StatusCandidatura; readonly title: string }[] = [
  { title: 'Candidatado', status: 'CANDIDATADO' },
  { title: 'Entrevista com RH/Bate papo', status: 'ENTREVISTARH' },
  { title: 'Entrevista Técnica', status: 'ENTREVISTATEC' },
  { title: 'Oferta', status: 'OFERTADO' },
  { title: 'Recusada', status: 'RECUSADA' },
  { title: 'Aceita', status: 'ACEITA' },
  { title: 'Sem resposta', status: 'SEMRESPOSTA' },
  { title: 'Desisti', status: 'DESISTI' },
];

export const PLATAFORMAS: { readonly valor: Plataforma; readonly rotulo: string }[] = [
  { valor: 'LINKEDIN', rotulo: 'LinkedIn' },
  { valor: 'GUPY', rotulo: 'Gupy' },
  { valor: 'CATHO', rotulo: 'Catho' },
  { valor: 'INFOJOBS', rotulo: 'InfoJobs' },
  { valor: 'INDEED', rotulo: 'Indeed' },
  { valor: 'SITE_DA_EMPRESA', rotulo: 'Site da empresa' },
  { valor: 'INDICACAO', rotulo: 'Indicação' },
  { valor: 'OUTRO', rotulo: 'Outro' },
];

export interface Candidatura {
  id: number;
  empresa: string;
  cargo: string;
  linkVaga: string | null;
  dataCandidatura: string;
  status: StatusCandidatura;
  tecnologias: string[];
  plataforma: Plataforma;
  contato: string | null;
  observacao: string | null;
}

export type CandidaturaRequest = Omit<Candidatura, 'id'>;
