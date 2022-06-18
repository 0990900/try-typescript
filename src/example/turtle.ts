type Move = (path: string[]) => void;
type Turn = (path: string[]) => void;
type Stop = (path: string[]) => void;
type TurtleProgram = Move | Turn | Stop;

const move =
  (meter: number, next?: TurtleProgram): Move =>
  (path: string[]) => {
    path.push(`Move ${meter} meter`);
    next && next(path);
  };

const turn =
  (degree: number, next?: TurtleProgram): Turn =>
  (path: string[]) => {
    path.push(`Turn ${degree} degree`);
    next && next(path);
  };

const stop =
  (next?: TurtleProgram): Stop =>
  (path: string[]) => {
    path.push('Stop');
    next && next(path);
  };

const compiler = (c: TurtleProgram): Array<string> => {
  const path = [] as Array<string>;
  c(path);
  return path;
};

export const Turtle = {
  move,
  turn,
  stop,
  compiler,
};
