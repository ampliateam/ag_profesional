import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';
import { verificarSPDuplicadoCreacion } from './middlewares/servicio-profesional';

// Guardar el valor por defecto de cada campo aqui
const defaultValue = {
    fechaCreacion: Date.now,
    fechaEliminacion: null,
};

const ServicioProfesionalSchema = new Schema({
    idProfesional: { type: String, required: true },
    nombreServicio: { type: String, required: true },
    observacion: { type: String, required: true },
    estado: { type: String, required: true },           // TServicioProfesionalEstado
    fechaCreacion: { type: Date, required: false, default: defaultValue.fechaCreacion },
    fechaEliminacion: { type: Date, required: false, default: defaultValue.fechaEliminacion },
}, { versionKey: false });

// Crear un índice único compuesto
ServicioProfesionalSchema.index({
    idProfesional: 1,
    nombreServicio: 1,
    estado: 1,
}, {
    unique: true,
    partialFilterExpression: { estado: { $in: ['habilitado', 'deshabilitado'] } }
});

// Middleware pre-save para verificar duplicados
ServicioProfesionalSchema.pre('save', async function(next) {
    try {
        console.log('proceso [save]');
        await verificarSPDuplicadoCreacion(this);
        next();
    } catch (error) {
        next(error);
    }
});

export const ServicioProfesionalModel = model(constants.nombreStore.servicioProfesional, ServicioProfesionalSchema);
