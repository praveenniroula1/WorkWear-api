import PaymentMethodSchema from "./PaymentMethodSchema.js";

export const insertPaymentMethod = (obj) => {
  return PaymentMethodSchema(obj).save();
};
export const getPaymentMethod = () => {
  return PaymentMethodSchema.find();
};
export const updatePaymentMethodById = ({ _id, ...update }) => {
  return PaymentMethodSchema.findByIdAndUpdate(_id, update);
};
export const deletePaymentMethodById = (_id) => {
  return PaymentMethodSchema.findByIdAndDelete(_id);
};
