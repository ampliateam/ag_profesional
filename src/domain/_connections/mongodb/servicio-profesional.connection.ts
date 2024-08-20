import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';

const ServicioProfesionalSchema = new Schema({
    idProfesional: { type: String, required: true },
    nombreServicio: { type: String, required: true },
    observacion: { type: String, required: true },
    estado: { type: String, required: true },           // TServicioProfesionalEstado
    fechaCreacion: { type: Date, required: true },
}, { versionKey: false });

export const ServicioProfesionalModel = model(constants.nombreStore.servicioProfesional, ServicioProfesionalSchema);
