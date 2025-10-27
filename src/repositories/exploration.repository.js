import { Ally } from '../models/ally.model.js';
import { Exploration } from '../models/exploration.model.js';





class ExplorationRepository {

    async addForOneUser(body, explorateir_id) {
        const explorateur = await Ally.findById(explorateir_id);
        if (!explorateur) {
            throw new Error('Explorateur not found');
        }
        explorateur.explorations.push(Exploration.create(body));
        return
    }
}

export default new ExplorationRepository();
