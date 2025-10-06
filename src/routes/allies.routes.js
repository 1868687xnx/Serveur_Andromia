import express from 'express';
import allyRepository from '../repositories/ally.repository.js';


import { guardAuthorizationJWT } from '../middlewares/authorization.jwt.js';
import explorateurRepository from '../repositories/explorateur.repository.js';

const router = express.Router();

router.post('/', addAlly);
router.get('/', retrieveAll);

async function addAlly(req, res, next) {
    try {
        let explorateur = await explorateurRepository.retrieveByEmail(req.auth.email);
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

async function retrieveAll(req, res, next) {
    try {
        let allies = await allyRepository.retrieveAll();
        allies = allies.map(a => {
            a = a.toObject({ getters: false, virtuals: false });
            a = allyRepository.transform(a, req.options);
            return a;
        });

        res.status(200).json(allies);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

export default router;
