import { Component, computed, input, signal, TemplateRef  } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import type { Step } from './model'

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    NgTemplateOutlet,
  ],
  template: `
    <div>
      <h2>{{ currentStep().label }}</h2>
      <ng-container
        *ngTemplateOutlet="template(); context:{
          goToNextStep: goToNextStep,
          goToPreviousStep: goToPreviousStep,
          changeStep: changeStep
        }">
      </ng-container>
    </div>
  `,
})
export class AppStepper {
  initialStepId = input<Step['id']>();
  steps = input<Step[]>();
  template = input<TemplateRef<{
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    changeStep: (id: Step['id']) => void;
  }>>();
  currentStepId = signal(this.initialStepId());

  ngOnInit() {
    this.currentStepId.set(this.initialStepId())
  }

  currentStep = computed(() => {
    const activeStep = this.steps()!.find((step) => step.id === this.currentStepId())

    if (!activeStep) {
      throw new Error(`Active step id ${this.currentStepId()} not found in steps`);
    }
    return activeStep;
  });

  changeStep = (newStepId: Step['id']) => {
    this.currentStepId.set(newStepId); 
    this.currentStep().beforeStateLoadedAction?.();
  }

  goToNextStep = () => {
    const next = this.currentStep().nextStep;
    if (!next) {
      throw new Error("You are on the last step, can't go further");
    }
    this.changeStep(next);
  }

  goToPreviousStep = () => {
    const prev = this.currentStep().previousStep;
    if (!prev) {
      throw new Error("You are on the first step, can't go back");
    }
    this.changeStep(prev);
  }
}
