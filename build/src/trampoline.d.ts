export declare type TrampolineProgram<R> = (...args: any[]) => Trampoline<R>;
export declare type Suspend<A> = {
    f: TrampolineProgram<A>;
};
export declare type Done<A> = {
    value: A;
};
export declare type Trampoline<A> = Suspend<A> | Done<A>;
export declare const isDone: <A>(free: Trampoline<A>) => free is Done<A>;
export declare const suspend: <A>(f: TrampolineProgram<A>) => Trampoline<A>;
export declare const done: <A>(value: A) => Trampoline<A>;
/**
 *
 * @param program 스택을 소비하는 재귀함수를 사용하는 함수
 * @param context 함수에 사용할 컨텍스트
 */
export declare const trampoline: <A>(program: TrampolineProgram<A>, context?: unknown) => (...args: unknown[]) => A;
