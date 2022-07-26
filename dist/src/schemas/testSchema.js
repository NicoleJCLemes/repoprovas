import joi from "joi";
var testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().pattern(/^(?:https?:\/\/)?(w{3}\.)?[\w_-]+((\.\w{2,}){1,2})(\/([\w\._-]+\/?)*(\?[\w_-]+=[^\?\/&]*(\&[\w_-]+=[^\?\/&]*)*)?)?$/).required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required()
});
export { testSchema };
