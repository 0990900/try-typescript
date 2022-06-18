import {Turtle} from '../src/example/turtle';

describe('Turtle', () => {
  test('Turtle Program', () => {
    const {move, turn, stop, compiler} = Turtle;
    expect(compiler(move(50, turn(45, stop()))).join(' -> ')).toBe(
      'Move 50 meters -> Turn 45 degrees -> Stop'
    );
  });
});
