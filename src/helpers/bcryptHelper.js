import bcrypt from "bcryptjs";

const saltRound = 10;
export const hashPassowrd = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRound);
};
export const ComparePassowrd = (plainPassword, hashPassowrd) => {
  return bcrypt.compareSync(plainPassword, hashPassowrd);
};
