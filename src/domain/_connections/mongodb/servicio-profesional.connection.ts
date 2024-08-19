import { Schema, Types, model } from 'mongoose';
import { constants } from '@global/configs/constants';

// Guardar el valor por defecto de cada campo aqui
const defaultValue = {
    _id: () => new Types.ObjectId().toHexString(),
};

const ServicioProfesionalSchema = new Schema({
    _id: { type: Schema.Types.Mixed, default: defaultValue._id },
    idProfesional: { type: String, required: true },
    nombreServicio: { type: String, required: true },
    observacion: { type: String, required: true },
    estado: { type: String, required: true },           // TServicioProfesionalEstado
    fechaCreacion: { type: Date, required: true },
}, {
    versionKey: false,
    _id: false,
});

export const ServicioProfesionalModel = model(constants.nombreStore.servicioProfesional, ServicioProfesionalSchema);
