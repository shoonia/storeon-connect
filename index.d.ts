import { createStoreon, StoreonStore, StoreonDispatch } from  'storeon';

export function storeonConnect<State, Events = any>(
  store: StoreonStore<State, Events>,
): StoreonConnect<State, Events>;

export interface StoreonConnect<State, Events> {
  getState(): State;
  dispatch: StoreonDispatch<Events & createStoreon.DispatchableEvents<State>>
  connect(...args: [...keys: (keyof State)[], handler: ConnectHandler<State>]): Disconnect;
}

export type ConnectHandler<State> = (state: State) => void;

export type Disconnect = () => void;
