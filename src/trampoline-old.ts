// eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/no-unused-vars
export interface TrampolineOld<A> {}

const trampolineOps = (() => {
  class Done<A> implements TrampolineOld<A> {
    constructor(readonly a: A) {}
  }

  class Suspend<A> implements TrampolineOld<A> {
    constructor(readonly supplier: () => TrampolineOld<A>) {}
  }

  const done = <A>(value: A): TrampolineOld<A> => new Done(value);
  const suspend = <A>(supplier: () => TrampolineOld<A>): TrampolineOld<A> =>
    new Suspend(supplier);

  const builder = <A>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f: (...args: any[]) => TrampolineOld<A>,
    context?: unknown
  ) => {
    const tryBind = (supplier: (...args: unknown[]) => TrampolineOld<A>) =>
      context ? supplier.bind(context) : supplier;
    return (...args: unknown[]): A => {
      let result: TrampolineOld<unknown> = tryBind(f)(...args);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (result instanceof Suspend) {
          result = tryBind(result.supplier)();
        } else if (result instanceof Done) {
          return result.a;
        }
      }
    };
  };
  return {
    done: done,
    suspend: suspend,
    builder: builder,
  };
})();

const trampolineOf = trampolineOps.builder;
const done = trampolineOps.done;
const suspend = trampolineOps.suspend;

export const old = {
  trampolineOf,
  suspend,
  done,
};
