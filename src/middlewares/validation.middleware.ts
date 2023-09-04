import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction, RequestHandler } from "express"; 
import Joi, { ValidationError, ValidationErrorItem } from "joi";

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const validationOptions =  {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };

        try {
            const value = await schema.validateAsync(req.body, validationOptions);
            req.body = value;
            next();
        } catch(e: unknown) {
            const errors: string[] = [];
            (e as ValidationError).details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({errors: errors});
        }
    }
}

export default validationMiddleware;