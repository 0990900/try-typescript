import * as O from 'fp-ts/Option'

describe('Monad', () => {
    test('Option', () => {
        expect(O.map((x: number) => x + 1)(O.some(42))).toStrictEqual(O.some(43));
    });
});
