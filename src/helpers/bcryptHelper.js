import bcrypt from "bcryptjs";

const saltRound = 10;
export const hashPassowrd = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRound);
};
