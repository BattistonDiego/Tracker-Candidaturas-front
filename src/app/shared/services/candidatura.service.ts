import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Candidatura,
  CandidaturaApi,
  CandidaturaRequest,
  PlataformaApi,
  PLATAFORMAS,
  StatusApiCandidatura,
  StatusCandidatura,
  STATUS_DA_API,
  STATUS_PARA_API,
} from '../models/candidatura';

@Injectable({ providedIn: 'root' })
export class CandidaturaService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/candidaturas`;

  listar(): Observable<Candidatura[]> {
    return this.http
      .get<CandidaturaApi[]>(this.url)
      .pipe(map((candidaturas) => candidaturas.map((candidatura) => this.fromApi(candidatura))));
  }

  criar(candidatura: Omit<Candidatura, 'id'>): Observable<Candidatura> {
    return this.http
      .post<CandidaturaApi>(this.url, this.toRequest(candidatura))
      .pipe(map((criada) => this.fromApi(criada)));
  }

  editar(candidatura: Candidatura): Observable<Candidatura> {
    return this.http
      .put<CandidaturaApi>(`${this.url}/${candidatura.id}`, this.toRequest(candidatura))
      .pipe(map((atualizada) => this.fromApi(atualizada)));
  }

  atualizarStatus(candidatura: Candidatura, status: StatusCandidatura): Observable<Candidatura> {
    return this.editar({ ...candidatura, status });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  rotuloPlataforma(plataforma: PlataformaApi): string {
    return PLATAFORMAS.find((item) => item.valor === plataforma)?.rotulo ?? plataforma;
  }

  private fromApi(candidatura: CandidaturaApi): Candidatura {
    return {
      ...candidatura,
      linkVaga: candidatura.linkVaga ?? undefined,
      dataCandidatura: this.parseDate(candidatura.dataCandidatura),
      status: STATUS_DA_API[candidatura.status as StatusApiCandidatura],
      plataforma: candidatura.plataforma,
      contato: candidatura.contato ?? undefined,
      observacao: candidatura.observacao ?? undefined,
    };
  }

  private toRequest(candidatura: Omit<Candidatura, 'id'>): CandidaturaRequest {
    return {
      empresa: candidatura.empresa,
      cargo: candidatura.cargo,
      linkVaga: candidatura.linkVaga ?? null,
      dataCandidatura: this.formatDate(candidatura.dataCandidatura),
      status: STATUS_PARA_API[candidatura.status],
      tecnologias: candidatura.tecnologias,
      plataforma: candidatura.plataforma,
      contato: candidatura.contato ?? null,
      observacao: candidatura.observacao ?? null,
    };
  }

  private parseDate(value: string): Date {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private formatDate(value: Date): string {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
