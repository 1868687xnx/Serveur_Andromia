import mongoose from 'mongoose';

const explorateurSchema = mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        uuid: {type: String, required: true, unique: true, default: () => crypto.randomUUID()},
        passwordHash: {type: String, required: true, unique: true}
    },
    {
        collection: 'explorateurs',
        strict: 'throw',
        timestamps: true
    }
);

const Explorateur = mongoose.model('Explorateur', explorateurSchema);

export { Explorateur };
