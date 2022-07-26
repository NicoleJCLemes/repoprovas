import joi from "joi";
var signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirmed: joi.ref("password")
});
var signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});
export { signUpSchema, signInSchema };
