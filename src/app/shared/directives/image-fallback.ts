import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  standalone: true
})
export class ImageFallbackDirective {
  @Input() appImageFallback = 'assets/pet-placeholder.png';

  @HostListener('error', ['$event'])
  onError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = this.appImageFallback;
  }
}
