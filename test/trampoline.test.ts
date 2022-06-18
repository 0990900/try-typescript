import {done, Trampoline, suspend, trampoline} from '../src/trampoline';
import {trampolineOld, TrampolineOld} from '../src/trampoline-old';

describe('Use Stack', () => {
  test('Sum', () => {
    const sum = (n: number): number => {
      const inner = (a: number, result = 0): number =>
        a ? inner(a - 1, result + a) : result;
      return inner(n);
    };
    expect(sum(10)).toBe(55);
    expect(() => sum(100000)).toThrow('Maximum call stack size exceeded');
  });
  test('Fibonacci', () => {
    const oldFibonacciProgram = (n: number): number => {
      const f = (a: number, b: number, count: number): number => {
        return count === n ? a + b : f(b, a + b, count + 1);
      };
      return f(0, 1, 0);
    };
    expect(() => oldFibonacciProgram(10000)).toThrow(
      'Maximum call stack size exceeded'
    );
  });
});

describe('Use Trampoline-old', () => {
  const {trampolineOf, suspend, done} = trampolineOld;
  test('Fibonacci', () => {
    const fibonacciProgram = (n: number): TrampolineOld<number> => {
      const f = (
        a: number,
        b: number,
        count: number
      ): TrampolineOld<number> => {
        return count === n
          ? done(a + b)
          : suspend(() => f(b, a + b, count + 1));
      };
      return f(0, 1, 0);
    };
    expect(trampolineOf(fibonacciProgram)(10000)).toBe(Infinity);
  });
});

describe('Use Trampoline', () => {
  test('Sum', () => {
    const sum = (n: number): Trampoline<number> => {
      const inner = (a: number, result = 0): Trampoline<number> =>
        a ? suspend(() => inner(a - 1, result + a)) : done(result);
      return inner(n);
    };
    expect(trampoline(sum)(10)).toBe(55);
    expect(trampoline(sum)(100000)).toBe(5000050000);
  });
  test('Fibonacci', () => {
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
