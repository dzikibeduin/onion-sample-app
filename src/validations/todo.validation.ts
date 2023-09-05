import Joi from "joi";

const create = Joi.object({
    title: Joi.string().required()
});

const get = Joi.object({
    id: Joi.string().required()
});

export default {create, get};