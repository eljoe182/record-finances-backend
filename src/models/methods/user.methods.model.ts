import * as bcrypt from "bcrypt";

export function comparePassword(password: string, passwordSecure: string): boolean {
  return bcrypt.compareSync(password, passwordSecure);
}
