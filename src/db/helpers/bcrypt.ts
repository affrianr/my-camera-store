import bcryptjs from "bcryptjs";

export const hashPassword = (password: string) =>
  bcryptjs.hashSync(password, 10);
export const comparePass = (password: string, hashedPassword: string) =>
  bcryptjs.compareSync(password, hashedPassword);
