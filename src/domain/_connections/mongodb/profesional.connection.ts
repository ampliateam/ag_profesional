import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';
import {
    verificarProfesionalDuplicadoCreacion,
} from './middlewares/profesional';

// Guardar el valor por defecto de cada campo aqui
const defaultValue = {
    direccion: { referencia: '', ubicacion: [0,0] },
    fechaCreacion: Date.now,
    fechaEliminacion: null,
};

const ProfesionalSchema = new Schema({
    idUsuario: { type: String, required: true },
    contactos: { type: Array, required: true },                                     // IProfesionalContacto[]
    direccion: { type: Object, required: false, default: defaultValue.direccion },  // IProfesionalDireccion
    etiqueta: { type: String, required: true },                                     // TProfesionalEtiqueta
    estado: { type: String, required: true },                                       // TProfesionalEstado
    fechaCreacion: { type: Date, required: false, default: defaultValue.fechaCreacion },
    fechaEliminacion: { type: Date, required: false, default: defaultValue.fechaEliminacion },
}, { versionKey: false });

// Crear un índice único compuesto
ProfesionalSchema.index({
    idUsuario: 1,
    etiqueta: 1,
    estado: 1,
}, {
    unique: true,
    partialFilterExpression: { estado: { $in: ['habilitado', 'deshabilitado'] } }
});

// Middleware pre-save para verificar duplicados
ProfesionalSchema.pre('save', async function(next) {
    try {
        console.log('proceso [save]');
        await verificarProfesionalDuplicadoCreacion(this);
        next();
    } catch (error) {
        next(error);
    }
});

export const ProfesionalModel = model(constants.nombreStore.profesional, ProfesionalSchema);
