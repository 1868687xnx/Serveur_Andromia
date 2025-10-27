import mongoose from 'mongoose';
import crypto from 'crypto';

const explorationSchema = mongoose.Schema(
    {
        explorationDate: {  
            type: date,
            required: true,
            default: Date.now
        },
        destination: { type: String, required: true},
        affinity: { type: String, required: true },
        vault: { 
            type: mongoose.Schema.Types.Array, 
            required: false
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

const Exploration = mongoose.model('Exploration', explorationSchema);

export { Exploration };

