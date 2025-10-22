import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loader',
  template: `
    <section class="spinner-container">
      <div class="spinner"></div>
      <h1>Loading...</h1>
    </section>
  `,
  styleUrls: ['./app-loader.scss'],
})
export class AppLoader { }
