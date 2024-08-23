import { Joi, celebrate, Segments } from "celebrate";

export const validateLogin = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  })
});

export const validateCreateUser = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .required()
      .email(),
    username: Joi.string().required(),
    password: Joi.string().required()
  })
});
