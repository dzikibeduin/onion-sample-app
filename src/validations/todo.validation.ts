import Joi from "joi";

const create = Joi.object({
    title: Joi.string().required()
});

const getOneTodo = Joi.object({
    id: Joi.string().required()
});

export default {create, getOneTodo};