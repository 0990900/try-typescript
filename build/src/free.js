"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compiler = void 0;
/**
 * 사용자의 입력을 받으면 주입된 컴파일러를 생성하고 실행해준다.
 * @param supplier  컴파일러를 생성하는 함수
 */
const compiler = (supplier) => (program, context) => (...args) => supplier(context).compile(program)(...args);
exports.compiler = compiler;
//# sourceMappingURL=free.js.map