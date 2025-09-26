import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <main class="main">
      Mega super zaawansowana aplikacja! WOW! SZOK! 
      <a routerLink="/free-money-form">Zakładka: Wypróbuj za darmo!</a>
    </main>
    <router-outlet />
  `
})
export class App {
}
