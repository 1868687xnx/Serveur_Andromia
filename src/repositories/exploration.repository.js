import { Ally } from '../models/ally.model.js';
import { Explorateur } from '../models/explorateur.model.js';
import { Exploration } from '../models/exploration.model.js';





class ExplorationRepository {

    async addForOneUser(body, explorateur_id) {
        const explorateur = await Explorateur.findById(explorateur_id);
        if (!explorateur) {
            throw new Error('Explorateur not found');
        }
        body.explorateur = explorateur_id;
        const exploration = await Exploration.create(body);
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
