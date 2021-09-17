export type TOrderPhase = 'inProgress' | 'review' | 'completed';

export type TSetOrderPhase = (phase: TOrderPhase) => void;