import { TypePrimitive } from "../Symbol/TypePrimitive";



export const Sum = [
  [TypePrimitive.INTEGER, TypePrimitive.DOUBLE, TypePrimitive.INTEGER, TypePrimitive.INTEGER, TypePrimitive.STRING], // 1
  [TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE, TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE,  TypePrimitive.STRING], // 2
  [TypePrimitive.INTEGER, TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.error,   TypePrimitive.STRING], // 3
  [TypePrimitive.INTEGER, TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.STRING, TypePrimitive.STRING],  // 4
  [TypePrimitive.STRING,  TypePrimitive.STRING, TypePrimitive.STRING,  TypePrimitive.STRING,  TypePrimitive.STRING], // 5
]

export const Sub = [
  [TypePrimitive.INTEGER, TypePrimitive.DOUBLE, TypePrimitive.INTEGER, TypePrimitive.INTEGER, TypePrimitive.error], // 1
  [TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE, TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE,  TypePrimitive.error], // 2
  [TypePrimitive.INTEGER, TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.error,   TypePrimitive.error], // 3
  [TypePrimitive.INTEGER, TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.error,   TypePrimitive.error],  // 4
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 5
]

export const Mul = [
  [TypePrimitive.INTEGER, TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.INTEGER,  TypePrimitive.error], // 1
  [TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.DOUBLE,   TypePrimitive.error], // 2
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 3
  [TypePrimitive.INTEGER, TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error],  // 4
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 5
]

export const Div = [
  [TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.DOUBLE,   TypePrimitive.error], // 1
  [TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.DOUBLE,   TypePrimitive.error], // 2
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 3
  [TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error],  // 4
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 5
]

export const Pow = [
  [TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 1
  [TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 2
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 3
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error],  // 4
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 5
]

export const Mod = [
  [TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 1
  [TypePrimitive.DOUBLE,  TypePrimitive.DOUBLE, TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 2
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 3
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error],  // 4
  [TypePrimitive.error,   TypePrimitive.error,  TypePrimitive.error,   TypePrimitive.error,    TypePrimitive.error], // 5
]