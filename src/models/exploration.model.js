import mongoose from 'mongoose';
import crypto from 'crypto';
import { ElementSchema } from './element.model.js';
import TABLE_ELEMENT from '../core/constants.js';

const explorationSchema = mongoose.Schema(
    {
        explorateur: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Explorateur'
        },
        explorationDate: {  
            type: Date,
            required: true,
            default: Date.now
        },
        destination: { type: String, required: true},
        affinity: { type: String, required: true },
        vault: {
            inox: { type: Number, default: 0 },
            elements: { type: []}
        },
        ally: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ally', 
            required: false
        }
    },
    {
        collection: 'explorations',
        strict: 'throw',
        timestamps: true
    }
);

const Exploration = mongoose.model('Explorations', explorationSchema);

export { Exploration };

