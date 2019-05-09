// import * as actions from "./someMocks"; // <= import the module...

// export function f1() {
//   return 1;
// }

// export function calls_f1() {
//   actions.f1(); // <= ...and use it to call f1
// }

export function f1() {
  return 1;
}

export function calls_f1() {
  f1(); // <= ...and use it to call f1
}
