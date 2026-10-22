import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('tracker-candidaturas');
  protected readonly theme = signal<'light' | 'dark'>(this.readSavedTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  protected setTheme(theme: 'light' | 'dark'): void {
    this.theme.set(theme);
    this.applyTheme(theme);
    try {
      localStorage.setItem('tracker-candidaturas-theme', theme);
    } catch {
      // A preferência continua valendo durante a sessão mesmo se o storage estiver indisponível.
    }
  }

  private readSavedTheme(): 'light' | 'dark' {
    try {
      return localStorage.getItem('tracker-candidaturas-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.dataset['theme'] = theme;
  }
}
