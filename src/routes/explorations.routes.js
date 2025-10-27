import express from 'express';
import HttpErrors from 'http-errors';
import allyRepository from '../repositories/ally.repository.js';
import explorationRepository from '../repositories/exploration.repository.js';

import explorateurRepository from '../repositories/explorateur.repository.js';

const router = express.Router();

router.post('/Ally', addAlly);
router.get('/', retrieveAll);
router.get('/:uuid', addExploration);

async function addAlly(req, res, next) {
    try {
        let explorateur = await explorateurRepository.retrieveByCredentials(req.auth.email);
        let newAlly = await explorateurRepository.addAlly(req.body, explorateur._id);

        if (req.query._body === 'false') {
            return res.status(204).end();
        }

        newAlly = newAlly.toObject({ getters: false, virtuals: false });
        newAlly = allyRepository.transform(newAlly);
        res.status(201).json(newAlly);
    } catch (err) {
        return next(err);
    }
}
async function addExploration(req, res, next) {
    try {
        const explorateur = await explorateurRepository.retrieveByUUID(req.params.uuid);
        if (!explorateur) {
            return next(HttpErrors.NotFound());
        }

        const newExploration = await explorationRepository.addForOneUser(req.body, explorateur._id);

        if (req.query._body === 'false') {
            return res.status(204).end();
        }

        res.status(200).json(allies);
    } catch (err) {
        return next(err);
    }
}

export default router;


