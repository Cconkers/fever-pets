import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './shared/services/i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private i18n: I18nService) {
    this.i18n.restoreLang();
  }
}
