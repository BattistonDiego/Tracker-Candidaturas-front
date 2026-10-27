import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Candidatura, CandidaturaRequest, Plataforma, PLATAFORMAS, StatusCandidatura } from '../models/candidatura';

@Injectable({ providedIn: 'root' })
export class CandidaturaService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/candidaturas`;

  listar(): Observable<Candidatura[]> {
    return this.http.get<Candidatura[]>(this.url);
  }

  criar(candidatura: CandidaturaRequest): Observable<Candidatura> {
    return this.http.post<Candidatura>(this.url, candidatura);
  }

  editar(candidatura: Candidatura): Observable<Candidatura> {
    const { id, ...request } = candidatura;
    return this.http.put<Candidatura>(`${this.url}/${id}`, request);
  }

  atualizarStatus(candidatura: Candidatura, status: StatusCandidatura): Observable<Candidatura> {
    return this.editar({ ...candidatura, status });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  rotuloPlataforma(plataforma: Plataforma): string {
    return PLATAFORMAS.find((item) => item.valor === plataforma)?.rotulo ?? plataforma;
  }
}
