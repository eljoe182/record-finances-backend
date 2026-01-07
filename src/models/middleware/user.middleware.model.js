import bcrypt from "bcrypt";

export async function encryptPassword() {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    console.log({ user });
  }
}

export async function encryptPasswordUpdateOne() {
  const password = this.getUpdate().password;
  if (!password) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    this.getUpdate().password = hash;
  } catch (error) {
    throw new Error("Error encrypting password");
  }
}
