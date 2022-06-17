"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trampoline = exports.done = exports.suspend = exports.isDone = void 0;
const free_1 = require("./free");
const isDone = (free) => 'value' in free;
exports.isDone = isDone;
const suspend = (f) => ({
    f,
});
exports.suspend = suspend;
const done = (value) => ({ value });
exports.done = done;
class TrampolineCompiler {
    constructor(context) {
        this.context = context;
    }
    prepare(f) {
        return this.context ? f.bind(this.context) : f;
    }
    compile(f) {
        return (...args) => {
            let r = this.prepare(f)(...args);
            // eslint-disable-next-line no-constant-condition
            while (true) {
                if ((0, exports.isDone)(r)) {
                    return r.value;
                }
                else {
                    r = this.prepare(r.f)();
                }
            }
        };
    }
}
/**
 *
 * @param program 스택을 소비하는 재귀함수를 사용하는 함수
 * @param context 함수에 사용할 컨텍스트
 */
const trampoline = (program, context) => (0, free_1.compiler)((context) => new TrampolineCompiler(context))(program, context);
exports.trampoline = trampoline;
//# sourceMappingURL=trampoline.js.map