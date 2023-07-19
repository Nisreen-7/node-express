
import { Person } from "../entities";
import { connection } from "./connection"

const collection = connection.db('first').collection<Person>('person');

export const personRepository = {
    findAll(){
        return collection.find().toArray();
    },
    findById() {}
}
