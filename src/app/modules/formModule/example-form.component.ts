import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Step } from '../stepModule/model';
import { AppStepper } from '../stepModule/app-stepper.component';

import { StartStepComponent } from './start-step.component';
import { NextStepComponent } from './next-step.component';
import { LastStepComponent } from './last-step.component';

enum AvailableFormStates {
    LOADING = "LOADING",
    START = "START",
    NEXT = "NEXT",
    LAST = "LAST"
}

type FormStates = {
    name: AvailableFormStates.LOADING
} | {
    name: AvailableFormStates.START,
} | {
    name: AvailableFormStates.NEXT,
    fullName: string,
} | {
    name: AvailableFormStates.LAST
}

@Component({
  selector: 'app-stepper-example',
  standalone: true,
  imports: [
    CommonModule,
    AppStepper,
    StartStepComponent,
    NextStepComponent,
    LastStepComponent,
  ],
  template: `
    @if(currentFormState().name !== AvailableFormStates.LOADING) {
      <app-stepper 
        [initialStepId]="steps[0].id" 
        [steps]="steps" 
        [template]="stepTemplate">
      </app-stepper>

      <ng-template #stepTemplate
             let-goToNextStep="goToNextStep"
             let-goToPreviousStep="goToPreviousStep"
             let-changeStep="changeStep">
        @if(currentFormState().name === AvailableFormStates.START) {
          <div>
            <start-step />
          </div>
        }
        @if(currentFormState().name === AvailableFormStates.NEXT) {
          <div>
            <next-step [fullName]="currentFormState().fullName" />
          </div>
        }
        @if(currentFormState().name === AvailableFormStates.LAST) {
          <div>
            <last-step />
          </div>
        }
        <button (click)="goToPreviousStep()">Wstecz</button>
        <button (click)="goToNextStep()">Dalej</button>
        <button (click)="changeStep('last')">Idź do ostatniego kroku</button>
      </ng-template>
    }
    @else if(currentFormState().name === AvailableFormStates.LOADING) {
      <div>Ładowanko</div>
    }
  `
})

export class ExampleForm {
  AvailableFormStates = AvailableFormStates;
  form = signal({
    name: '',
    surname: '',
  })

  ngOnInit() {
    setTimeout(() => {
      this.currentFormState.set({
        name: AvailableFormStates.START
      });
    }, 3000);
  }

  steps: Step[] = [
    {
        id: 'start',
        label: "Wpisz dane",
        nextStep: 'next',
        beforeStateLoadedAction: () => {
            this.currentFormState.set({
                name: AvailableFormStates.START
            })
        }
    },
    {
        id: 'next',
        label: "Upewnij się o danych",
        nextStep: 'koniec',
        previousStep: 'start',
        beforeStateLoadedAction: () => {
            this.currentFormState.set({
                name: AvailableFormStates.NEXT,
                fullName: `${this.form().name} ${this.form().surname}`
            })
        }
    },
    {
        id: 'koniec',
        label: "Zobacz dane",
        previousStep: 'next',
        beforeStateLoadedAction: () => {
            this.currentFormState.set({
                name: AvailableFormStates.LAST
            })
        }
    },
  ]

  currentFormState = signal<FormStates>({
    name: AvailableFormStates.LOADING
  })

  saveStartInfo (name: string, surname: string) {
      this.form.set({
          name,
          surname,
      })
  }
}
