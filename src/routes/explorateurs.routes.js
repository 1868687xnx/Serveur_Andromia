import express from 'express';
import HttpErrors from 'http-errors';

import validator from './../middlewares/validator.js';

import allyRepository from "../repositories/ally.repository.js"
import explorateurRepository from "../repositories/explorateur.repository.js"

import { guardAuthorizationJWT } from '../middlewares/authorization.jwt.js';

import explorateurValidators from '../validators/explorateur.validator.js';

const router = express.Router();

router.post('/', explorateurValidators.postValidator(), validator, post);
router.get('/:uuid', retrieveOne);
router.get('/:uuid/allies', retrieveAlliesForExplorateur);

async function post(req, res, next) {
    try {
        let account = await explorateurRepository.create(req.body);
        //TODO:JWT TOKENS
        const tokens = explorateurRepository.generateJWT(account.uuid);
        account = account.toObject({ getters: false, virtuals: false });
        account = explorateurRepository.transform(account);

        

        res.status(201).json({ account, tokens });
    } catch (err) {
        return next(err);
    }
}

async function retrieveOne(req, res, next) {
    try {
        let account = await explorateurRepository.retrieveByUUID(req.params.uuid);
        if (!account) {
            return next(HttpErrors.NotFound());
        } else {
            account = account.toObject({ getters: false, virtuals: false });
            account = explorateurRepository.transform(account);
            res.status(200).json(account);
        }
    } catch (err) {
        return next(err);
    }
}

async function retrieveAlliesForExplorateur(req, res, next) {
    try {
        const tokenBase64 = req.auth.base64;
        if (req.params.base64 !== tokenBase64) {
            return next(HttpErrors.Forbidden());
        }
        const account = await explorateurRepository.retrieveByBase64(tokenBase64);
        let allies = await allyRepository.retrieveForOneUser(account._id);

        allies = allies.map(a => {
            a = a.toObject();
            return allyRepository.transform(e);
        });

        res.status(200).json(allies);
    } catch (err) {
        return next(err);
    }
}

export default router;
