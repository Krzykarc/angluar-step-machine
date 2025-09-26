import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'next-step',
  standalone: true,
  template: `
    <div>
      <div>Środkowy krok</div>
      <div>Twoje pełne dane to {{ fullName() }}</div>
    </div>
  `
})
export class NextStepComponent {
  fullName = input<string>();
}
