import { Router } from "express";
import { personRepository } from "../repository/person-repository";


export const personController = Router();

personController.get('/', async (req, res) => {
    const persons = await personRepository.findAll();
    res.json(persons);
})