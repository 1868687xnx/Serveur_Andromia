import mongoose from 'mongoose';
import crypto from 'crypto';

const allySchema = mongoose.Schema(
    {
        explorateur: {  
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Explorateur',
            required: true
        },
        base64: { type: String, default: crypto.randomBytes(16).toString('base64url') },
        stats: { 
            type: mongoose.Schema.Types.Array, 
            required: true 
        },
        power: { 
            type: mongoose.Schema.Types.Array,
            required: true
        },
        shield: { 
            type: mongoose.Schema.Types.Array,
            required: true
        },
        crypto: { 
            type: mongoose.Schema.Types.String,
            required: true
        },
        kernel: { 
            type: mongoose.Schema.Types.Array,
            required: true
        }
    },
    {
        collection: 'allies',
        strict: 'throw',
        timestamps: true
    }
);

const Ally = mongoose.model('Ally', allySchema);

export { Ally };

