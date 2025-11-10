import { Ally } from '../models/ally.model.js';


class AllyRepository {
    retrieveByUUID(uuid) {
        return Ally.find({uuid: uuid});
    }

    retrieveForOneUser(idExplorateur) {
        return Ally.find({idExplorateur: idExplorateur});
    }

    transform(ally, explorateur_id) {
        ally.explorateur = explorateur_id;
        ally.href = `${process.env.BASE_URL}/allies/${ally.uuid}`;
        delete ally.books;
        delete ally.expireAt;
        delete ally.crypto;
        return ally;
    }

    async createForOneUser(allyUUID, explorateur_id) {
        newally = Ally.findOne({uuid: allyUUID});
        if (!newally) {
            throw new Error("Ally not found");
        }
        newally = this.transform(newally, explorateur_id);
        return Ally.create(newally);
    }
}

export default new AllyRepository();
