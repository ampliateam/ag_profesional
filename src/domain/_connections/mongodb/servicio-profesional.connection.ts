import { Schema, Types, model } from 'mongoose';
import { constants } from '@global/configs/constants';

// // Guardar el valor por defecto de cada campo aqui
// const defaultValue = {};

const ServicioProfesionalSchema = new Schema({
    idProfesional: { type: String, required: true },
    nombreServicio: { type: String, required: true },
    observacion: { type: String, required: true },
    estado: { type: String, required: true },           // TServicioProfesionalEstado
    fechaCreacion: { type: Date, required: true },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
});

// Duplicate the ID field.
ServicioProfesionalSchema.virtual('id').set(function(v: string){
    this._id = new Types.ObjectId(v);
});
ServicioProfesionalSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ServicioProfesionalSchema.pre('findOneAndDelete', (next, opts) => {
    try {
        opts.

        next()
    } catch (error) {
        next(error);
    }
})

export const ServicioProfesionalModel = model(constants.nombreStore.servicioProfesional, ServicioProfesionalSchema);
