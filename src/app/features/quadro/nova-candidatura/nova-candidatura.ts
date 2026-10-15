import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Plataforma } from '../../../shared/models/candidatura';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-nova-candidatura',
  styleUrl: './nova-candidatura.scss',
  templateUrl: './nova-candidatura.html',
})
export class NovaCandidatura {
  private dialogRef = inject(DialogRef);
  private fb = inject(FormBuilder);

  plataformas: Plataforma[] = ['LinkedIn', 'Indeed', 'Site da empresa', 'Indicação', 'Outro'];
  tecnologias = signal<string[]>([]);

  form = this.fb.nonNullable.group({
    empresa: ['', Validators.required],
    cargo: ['', Validators.required],
    linkVaga: [''],
    dataCandidatura: ['', Validators.required],
    plataforma: ['LinkedIn' as Plataforma],
    contato: [''],
    observacao: [''],
  });

  closeModal() {
    this.dialogRef.close(true);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.dialogRef.close({
      ...v,
      dataCandidatura: new Date(v.dataCandidatura + 'T00:00:00'),
      tecnologias: this.tecnologias(),
      status: 'candidatado',
    });
  }

  adicionarTec(event: Event, input: HTMLInputElement) {
    event.preventDefault();
    const valor = input.value.trim();
    if (valor && !this.tecnologias().includes(valor)) {
      this.tecnologias.update((lista) => [...lista, valor]);
    }
    input.value = '';
  }

  removerTec(tec: string) {
    this.tecnologias.update((lista) => lista.filter((t) => t !== tec));
  }
}
