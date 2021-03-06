import bcrypt from "bcrypt";

export function encryptPassword(next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
}

export function encryptPasswordUpdateOne(next) {
  const password = this.getUpdate().password;
  if (!password) {
    return next();
  }
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        this.getUpdate().password = hash;
        next();
      });
    });
  } catch (error) {
    return next(error);
  }
}
