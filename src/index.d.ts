import { createStoreon, StoreonStore, StoreonDispatch } from  'storeon';

export function storeonConnect<State, Events = any>(
  store: StoreonStore<State, Events>,
): StoreonConnect<State, Events>;

export interface StoreonConnect<State, Events> {
  /**
   * Return current state. You can use this method only to read state.
   * Any state changes should be in event listeners.
   *
   * @returns The current state.
   */
  getState(): Readonly<State>;

  /**
   * Set partial state
   *
   * @param data Partial part of stare
   */
  setState(data: Partial<State>): void;

  /**
   * Emit event.
   *
   * @param event The event name.
   * @param data Any additional data for the event.
   */
  dispatch: StoreonDispatch<Events & createStoreon.DispatchableEvents<State>>;

  /**
   * Connects store state by property keys.
   *
   * @returns The function disconnect from the store.
   */
  connect(...args: [...keys: (keyof State)[], handler: ConnectHandler<State>]): () => void;
}

export type ConnectHandler<State> = (state: Readonly<State>) => void;
