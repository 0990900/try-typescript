import {done, Trampoline, suspend, trampoline} from '../src/trampoline';
import {old, TrampolineOld} from '../src/trampoline-old';

describe('Trampoline-old', () => {
  test('Trampoline - Fibonacci', () => {
    const oldFibonacciProgram = (n: number): number => {
      const f = (a: number, b: number, count: number): number => {
        return count === n ? a + b : f(b, a + b, count + 1);
      };
      return f(0, 1, 0);
    };
    expect(() => oldFibonacciProgram(10000)).toThrow(
      'Maximum call stack size exceeded'
    );
    const fibonacciProgram = (n: number): TrampolineOld<number> => {
      const f = (
        a: number,
        b: number,
        count: number
      ): TrampolineOld<number> => {
        return count === n
          ? old.done(a + b)
          : old.suspend(() => f(b, a + b, count + 1));
      };
      return f(0, 1, 0);
    };
    expect(old.trampolineOf(fibonacciProgram)(10000)).toBe(Infinity);
  });
});

describe('Trampoline', () => {
  test('Trampoline - Sum', () => {
    const sum = (n: number): Trampoline<number> => {
      const inner = (a: number, result = 0): Trampoline<number> =>
        a ? suspend(() => inner(a - 1, result + a)) : done(result);
      return inner(n);
    };
    expect(trampoline(sum)(10)).toBe(55);
  });
  test('Trampoline - Fibonacci', () => {
    const fibonacciProgram = (n: number): Trampoline<number> => {
      const f = (a: number, b: number, count: number): Trampoline<number> => {
        return count === n
          ? done(a + b)
          : suspend(() => f(b, a + b, count + 1));
      };
      return f(0, 1, 0);
    };
    expect(trampoline(fibonacciProgram)(10000)).toBe(Infinity);
  });
});
