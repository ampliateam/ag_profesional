import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';
import { verificarSPDuplicadoCreacion } from './middlewares/servicio-profesional';
import { IServicioProfesional } from '@global/models/interfaces';
import { TServicioProfesionalEstado } from '@global/models/types';

// Definir la interfaz para el documento
interface IServicioProfesionalMongoose extends Document, Omit<IServicioProfesional, '_id'> {};

// Guardar el valor por defecto de cada campo aqui (para los required=false)
const defaultValue = {
    estado: 'habilitado' as TServicioProfesionalEstado,
    fechaCreacion: Date.now,
    fechaEliminacion: null,
};

// Schema de mongoose
const ServicioProfesionalSchema = new Schema<IServicioProfesionalMongoose>({
    idProfesional: { type: String, required: true },
    nombreServicio: { type: String, required: true },
    observacion: { type: String, required: true },
    estado: { type: String, required: false, default: defaultValue.estado },           // TServicioProfesionalEstado
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

export const ServicioProfesionalModel = model<IServicioProfesionalMongoose>(
    constants.nombreStore.servicioProfesional,
    ServicioProfesionalSchema
);
