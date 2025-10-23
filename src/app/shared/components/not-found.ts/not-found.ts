import { Component } from "@angular/core";

@Component({
  selector: 'app-not-found',
  imports: [],
  template: `<h1>NOT FOUND</h1>`,
  styles: [`
    h1 {
      font-size: 3rem;
      color: var(--primary, #333);
    }
  `]
})
export class NotFound { }
