import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Candidatura, StatusCandidatura } from '../../shared/models/candidatura';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { NovaCandidatura } from './nova-candidatura/nova-candidatura';
import { CandidaturaService } from '../../shared/services/candidatura.service';
import { finalize } from 'rxjs';
import { AppIcon } from '../../shared/components/icon/icon';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  imports: [DatePipe, DragDropModule, AppIcon],
  selector: 'app-quadro',
  styleUrl: './quadro.scss',
  templateUrl: './quadro.html',
})
export class Quadro implements OnInit {
  readonly colunas: { title: string; status: StatusCandidatura }[] = [
    { title: 'Candidatado', status: 'candidatado' },
    { title: 'Entrevista com RH/Bate papo', status: 'entrevistaRH' },
    { title: 'Entrevista Técnica', status: 'entrevistaTec' },
    { title: 'Oferta', status: 'ofertado' },
    { title: 'Recusada', status: 'recusada' },
    { title: 'Aceita', status: 'aceita' },
    { title: 'Sem resposta', status: 'semResposta' },
    { title: 'Desisti', status: 'desisti' },
  ];

  private dialog = inject(Dialog);
  private readonly candidaturaService = inject(CandidaturaService);
  readonly candidaturas = signal<Candidatura[]>([]);
  readonly carregando = signal(true);
  readonly mensagemErro = signal('');

  ngOnInit(): void {
    this.carregarCandidaturas();
  }

  carregarCandidaturas(): void {
    this.carregando.set(true);
    this.mensagemErro.set('');
    this.candidaturaService
      .listar()
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe({
        next: (candidaturas) => this.candidaturas.set(candidaturas),
        error: () => this.mensagemErro.set('Não foi possível carregar as candidaturas.'),
      });
  }

  candidaturasDa(status: StatusCandidatura): Candidatura[] {
    return this.candidaturas().filter((c) => c.status === status);
  }

  soltar(event: CdkDragDrop<StatusCandidatura>): void {
    const candidatura = event.item.data as Candidatura;
    const statusAnterior = candidatura.status;
    const novoStatus = event.container.data;
    if (statusAnterior === novoStatus) return;

    this.mensagemErro.set('');
    this.atualizarNaLista({ ...candidatura, status: novoStatus });
    this.candidaturaService.atualizarStatus(candidatura, novoStatus).subscribe({
      next: (atualizada) => this.atualizarNaLista(atualizada),
      error: () => {
        this.atualizarNaLista({ ...candidatura, status: statusAnterior });
        this.mensagemErro.set('Não foi possível atualizar o status. A candidatura voltou à coluna anterior.');
      },
    });
  }

  abrirModal(candidatura?: Candidatura): void {
    const ref = this.dialog.open<Candidatura | undefined>(NovaCandidatura, {
      width: 'min(35rem, calc(100vw - 2rem))',
      maxHeight: 'calc(100dvh - 2rem)',
      panelClass: 'modal-nova-candidatura',
      data: candidatura ?? null,
    });

    ref.closed.subscribe((salva) => {
      if (salva) {
        this.atualizarNaLista(salva);
        this.mensagemErro.set('');
      }
    });
  }

  excluir(candidatura: Candidatura): void {
    const ref = this.dialog.open<boolean>(ConfirmationDialog, {
      width: 'min(28rem, calc(100vw - 2rem))',
      maxHeight: 'calc(100dvh - 2rem)',
      panelClass: 'modal-confirmacao',
      ariaLabelledBy: 'confirmacao-titulo',
      ariaDescribedBy: 'confirmacao-mensagem',
      data: {
        title: 'Excluir candidatura?',
        message: `Tem certeza que deseja excluir a candidatura de ${candidatura.cargo} na ${candidatura.empresa}?`,
        cancelText: 'Não',
        confirmText: 'Sim',
      },
    });

    ref.closed.subscribe((confirmado) => {
      if (confirmado !== true) return;

      this.mensagemErro.set('');
      this.candidaturaService.excluir(candidatura.id).subscribe({
        next: () => this.candidaturas.update((lista) => lista.filter((item) => item.id !== candidatura.id)),
        error: () => this.mensagemErro.set('Não foi possível excluir a candidatura.'),
      });
    });
  }

  rotuloPlataforma(plataforma: Candidatura['plataforma']): string {
    return this.candidaturaService.rotuloPlataforma(plataforma);
  }

  private atualizarNaLista(candidatura: Candidatura): void {
    this.candidaturas.update((lista) => {
      const existe = lista.some((item) => item.id === candidatura.id);
      return existe
        ? lista.map((item) => (item.id === candidatura.id ? candidatura : item))
        : [...lista, candidatura];
    });
  }
}
