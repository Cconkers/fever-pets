import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loader',
  template: `
    <section class="loader-container">
      <div class="spinner"></div>
      <p>Loading Fever Pets...</p>
    </section>
  `,
  styles: [`
    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: var(--surface, #fafafa);
      color: var(--primary, #333);
      font-family: 'IBM Plex Sans', sans-serif;
      gap: 1rem;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #ccc;
      border-top-color: #2196f3;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
  `]
})
export class AppLoader {}
