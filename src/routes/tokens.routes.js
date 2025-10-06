import express from 'express';
import HttpErrors from 'http-errors';

import { guardRefreshTokenJWT } from '../middlewares/authorization.jwt.js';

import clientRepository from '../repositories/client.repository.js';

import TokenController from '../controllers/token.controller.js';
import explorateurRepository from '../repositories/explorateur.repository.js';
const tokenController = new TokenController()

const router = express.Router();

router.post('/', guardRefreshTokenJWT, refresh);

async function refresh(req, res, next) {

    try {
        const tokens = explorateurRepository.generateJWT(req.refresh.uuid);
        res.status(201).json(tokens);
    } catch (err) {
        return next(err);
    }
}

router.delete('/', (req, res, next) => {
    try {
        //TODO:
    } catch (err) {
        return next(err);
    }
});

export default router;
