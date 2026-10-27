import { DialogRef } from '@angular/cdk/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Candidatura, PLATAFORMAS, PlataformaApi } from '../../../shared/models/candidatura';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidaturaService } from '../../../shared/services/candidatura.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-nova-candidatura',
  styleUrl: './nova-candidatura.scss',
  templateUrl: './nova-candidatura.html',
})
export class NovaCandidatura {
  private dialogRef = inject<DialogRef<Candidatura | undefined>>(DialogRef);
  private readonly candidaturaService = inject(CandidaturaService);
  readonly candidatura = inject<Candidatura | null>(DIALOG_DATA, { optional: true });
  readonly editando = !!this.candidatura;
  readonly salvando = signal(false);
  readonly mensagemErro = signal('');
  private fb = inject(FormBuilder);

  readonly plataformas = PLATAFORMAS;
  readonly tecnologias = signal<string[]>(this.candidatura?.tecnologias ?? []);

  form = this.fb.nonNullable.group({
    empresa: [this.candidatura?.empresa ?? '', Validators.required],
    cargo: [this.candidatura?.cargo ?? '', Validators.required],
    linkVaga: [this.candidatura?.linkVaga ?? ''],
    dataCandidatura: [this.toDateInput(this.candidatura?.dataCandidatura), Validators.required],
    plataforma: [this.candidatura?.plataforma ?? ('LINKEDIN' as PlataformaApi), Validators.required],
    contato: [this.candidatura?.contato ?? ''],
    observacao: [this.candidatura?.observacao ?? ''],
  });

  closeModal(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    const candidatura: Omit<Candidatura, 'id'> = {
      ...values,
      linkVaga: values.linkVaga || undefined,
      contato: values.contato || undefined,
      observacao: values.observacao || undefined,
      dataCandidatura: this.parseDateInput(values.dataCandidatura),
      tecnologias: this.tecnologias(),
      status: this.candidatura?.status ?? 'candidatado',
    };

    this.salvando.set(true);
    this.mensagemErro.set('');
    const request = this.candidatura
      ? this.candidaturaService.editar({ ...candidatura, id: this.candidatura.id })
      : this.candidaturaService.criar(candidatura);

    request.subscribe({
      next: (salva) => this.dialogRef.close(salva),
      error: () => {
        this.salvando.set(false);
        this.mensagemErro.set('Não foi possível salvar a candidatura. Confira os dados e tente novamente.');
      },
    });
  }

  adicionarTec(event: Event, input: HTMLInputElement): void {
    event.preventDefault();
    const valor = input.value.trim();
    if (valor && !this.tecnologias().includes(valor)) {
      this.tecnologias.update((lista) => [...lista, valor]);
    }
    input.value = '';
  }

  removerTec(tec: string): void {
    this.tecnologias.update((lista) => lista.filter((t) => t !== tec));
  }

  private toDateInput(date?: Date): string {
    if (!date) return '';
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  }

  private parseDateInput(value: string): Date {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
