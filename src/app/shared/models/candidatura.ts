export type StatusCandidatura =
  | 'candidatado'
  | 'entrevistaRH'
  | 'entrevistaTec'
  | 'ofertado'
  | 'aceita'
  | 'recusada'
  | 'semResposta'
  | 'desisti';

export type Plataforma = 'LinkedIn' | 'Indeed' | 'Site da empresa' | 'Indicação' | 'Outro';

export interface Candidatura {
  id: number;
  empresa: string;
  cargo: string;
  linkVaga?: string;
  dataCandidatura: Date;
  status: StatusCandidatura;
  tecnologias: string[];
  plataforma: Plataforma;
  contato?: string;
  observacao?: string;
}
