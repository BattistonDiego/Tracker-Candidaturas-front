import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Candidatura, StatusCandidatura } from '../../shared/models/candidatura';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { NovaCandidatura } from './nova-candidatura/nova-candidatura';

@Component({
  imports: [DatePipe, DragDropModule],
  selector: 'app-quadro',
  styleUrl: './quadro.scss',
  templateUrl: './quadro.html',
})
export class Quadro {
  colunas: { title: string; status: StatusCandidatura }[] = [
    { title: 'Candidatado', status: 'candidatado' },
    { title: 'Entrevista com RH/Bate papo', status: 'entrevistaRH' },
    { title: 'Entrevista Técnica', status: 'entrevistaTec' },
    { title: 'Oferta', status: 'ofertado' },
    { title: 'Recusada', status: 'recusada' },
  ];

  tecnologias = signal<string[]>([]);

  candidaturas: Candidatura[] = [
    {
      id: 1,
      empresa: 'Nubank',
      cargo: 'Desenvolvedor Front-end Pleno',
      dataCandidatura: new Date(2026, 8, 28),
      status: 'candidatado',
      tecnologias: ['Angular', 'TypeScript', 'RxJS'],
      plataforma: 'LinkedIn',
    },
    {
      id: 2,
      empresa: 'iFood',
      cargo: 'Engenheira de Software Frontend',
      dataCandidatura: new Date(2026, 8, 30),
      status: 'candidatado',
      tecnologias: ['React', 'TypeScript', 'GraphQL'],
      plataforma: 'Site da empresa',
    },
    {
      id: 3,
      empresa: 'Stone',
      cargo: 'Desenvolvedor Front-end',
      dataCandidatura: new Date(2026, 8, 29),
      status: 'candidatado',
      tecnologias: ['Angular', 'Jest'],
      plataforma: 'Indeed',
    },
    {
      id: 4,
      empresa: 'QuintoAndar',
      cargo: 'Frontend Engineer',
      dataCandidatura: new Date(2026, 8, 18),
      status: 'entrevistaRH',
      tecnologias: ['React', 'Next.js', 'TypeScript'],
      plataforma: 'LinkedIn',
    },
    {
      id: 5,
      empresa: 'Mercado Livre',
      cargo: 'Desenvolvedor Full Stack',
      dataCandidatura: new Date(2026, 8, 15),
      status: 'entrevistaRH',
      tecnologias: ['Java', 'Angular', 'AWS'],
      plataforma: 'Indicação',
    },
    {
      id: 6,
      empresa: 'PicPay',
      cargo: 'Desenvolvedor Front-end Sênior',
      dataCandidatura: new Date(2026, 8, 8),
      status: 'entrevistaTec',
      tecnologias: ['Angular', 'TypeScript', 'Jest'],
      plataforma: 'LinkedIn',
    },
    {
      id: 7,
      empresa: 'CI&T',
      cargo: 'Desenvolvedor Front-end',
      dataCandidatura: new Date(2026, 7, 25),
      status: 'ofertado',
      tecnologias: ['Angular', 'SCSS', 'Azure DevOps'],
      plataforma: 'Indicação',
    },
    {
      id: 8,
      empresa: 'VTEX',
      cargo: 'Software Engineer',
      dataCandidatura: new Date(2026, 7, 20),
      status: 'recusada',
      tecnologias: ['React', 'Node.js'],
      plataforma: 'Site da empresa',
    },
  ];

  private dialog = inject(Dialog);

  data = new Date();

  candidaturasDa(status: StatusCandidatura): Candidatura[] {
    return this.candidaturas.filter((c) => c.status === status);
  }

  soltar(event: CdkDragDrop<StatusCandidatura>) {
    const candidatura = event.item.data as Candidatura;
    candidatura.status = event.container.data;
  }

  openModal() {
    const ref = this.dialog.open<Omit<Candidatura, 'id'>>(NovaCandidatura, {
      width: '560px',
      height: '700px',
      panelClass: 'modal-nova-candidatura',
    });

    ref.closed.subscribe((resultado) => {
      if (resultado) {
        console.log(resultado);
      }
    });
  }
}
