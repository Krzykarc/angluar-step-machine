import { Component, signal, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'start-step',
  standalone: true,
  template: `
    <div>
      <div>Start Step</div>
      <label>
        Imię
        <input
          [value]="name()"
          (input)="name.set($any($event.target).value)"
        />
      </label>
      <label>
        Nazwisko
        <input
          [value]="surname()"
          (input)="surname.set($any($event.target).value)"
        />
      </label>
      <button (click)="onSave()">Zapisz</button>
    </div>
  `
})
export class StartStepComponent {
  name = signal<string>('');
  surname = signal<string>('');

  @Output() save = new EventEmitter<[string, string]>();

  onSave() {
    this.save.emit([ this.name(), this.surname() ]);
  }
}
