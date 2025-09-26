interface Step {
  id: string | number;
  label: string;
  nextStep?: string | number;
  previousStep?: string | number;
  beforeStateLoadedAction?: () => void;
}

export type {
    Step
}