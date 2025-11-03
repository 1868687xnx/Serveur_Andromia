import { all } from 'axios';
import { Ally } from '../models/ally.model.js';
import { de } from '@faker-js/faker';



class AllyRepository {
    retrieveByUUID(uuid) {
        return Ally.find({uuid: uuid});
    }

    retrieveForOneUser(idExplorateur) {
        return Ally.find({idExplorateur: idExplorateur});
    }

    transform(ally) {
        delete ally.books;
        delete ally.expireAt;
        delete ally.crypto;
        return ally;
    }
}

export default new AllyRepository();
