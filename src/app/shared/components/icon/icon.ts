import { Component, Input } from '@angular/core';

export type AppIconName = 'edit' | 'delete';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    @switch (name) {
      @case ('edit') {
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m15 5 4 4M4 20l4.25-.85L19 8.4a2.12 2.12 0 0 0-3-3L5.25 16.15 4 20Z" />
        </svg>
      }
      @case ('delete') {
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" />
        </svg>
      }
    }
  `,
  styles: `
    :host { display: inline-flex; width: 1.25rem; height: 1.25rem; flex: 0 0 auto; }
    svg { width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  `,
})
export class AppIcon {
  @Input({ required: true }) name!: AppIconName;
}
