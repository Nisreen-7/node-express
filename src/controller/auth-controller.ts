import { Router } from "express";
import { userRepository } from "../repository/user-repository";
import Joi from "joi";


export const authController = Router();

authController.post('/', async (req,res) => {
    const validation = userValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const user = await userRepository.persist(req.body);
    res.status(201).json(user);
});



const userValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),

});




