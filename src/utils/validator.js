import Joi from 'joi';

export default (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(3).max(50).required(),
    message: Joi.string().min(3).max(2000).required()
  });

  return schema.validate(body);
};
