import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-quadro',
  styleUrl: './quadro.scss',
  templateUrl: './quadro.html',
})
export class Quadro {
  colunas: { title: string; status: string }[] = [
    { title: 'Candidatado', status: 'candidatado' },
    { title: 'Entrevista com RH/Bate papo', status: 'entrevistaRH' },
    { title: 'Entrevista Técnica', status: 'entrevistaTec' },
    { title: 'Oferta', status: 'ofertado' },
    { title: 'Recusada', status: 'recusada' },
  ];
}
