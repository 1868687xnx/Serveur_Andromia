import { Ally } from '../models/ally.model.js';
import { Explorateur } from '../models/explorateur.model.js';
import { Exploration } from '../models/exploration.model.js';





class ExplorationRepository {

    async addForOneUser(body, explorateir_id) {
        const explorateur = await Explorateur.findById(explorateir_id);
        if (!explorateur) {
            throw new Error('Explorateur not found');
        }
        const exploration = Exploration.create(body);
        this.transform(exploration);
        return exploration;
    }

    transform(exploration) {
        exploration.href = `${process.env.BASE_URL}/explorations/${exploration.uuid}`;

        delete exploration.Ally;
        

        return exploration;
    }
}

export default new ExplorationRepository();
