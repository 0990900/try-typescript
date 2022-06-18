type Move = (path: string[]) => void;
type Turn = (path: string[]) => void;
type Stop = (path: string[]) => void;
type Command = Move | Turn | Stop;

const move =
  (meter: number, next?: Command): Move =>
  (path: string[]) => {
    path.push(`Move ${meter} meters`);
    next && next(path);
  };

const turn =
  (degree: number, next?: Command): Turn =>
  (path: string[]) => {
    path.push(`Turn ${degree} degrees`);
    next && next(path);
  };

const stop =
  (next?: Command): Stop =>
  (path: string[]) => {
    path.push('Stop');
    next && next(path);
  };

const compiler = (program: Command): Array<string> => {
  const path = [] as Array<string>;
  program(path);
  return path;
};

export const Turtle = {
  move,
  turn,
  stop,
  compiler,
};
