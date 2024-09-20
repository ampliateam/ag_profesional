import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';
import {
    verificarProfesionalDuplicadoCreacion,
} from './middlewares/profesional';
import { IProfesional } from '@global/models/interfaces';
import { TProfesionalContacto, TProfesionalEstado } from '@global/models/types';

// Definir la interfaz para el documento
interface IProfesionalMongoose extends Document, Omit<IProfesional, '_id'> {};

// Guardar el valor por defecto de cada campo aqui (para los required=false)
const defaultValue = {
    fotoPerfil: '',
    fotoPortada: '',
    estado: 'habilitado' as TProfesionalEstado,
    fechaCreacion: Date.now,
    fechaEliminacion: null,
};

// Schema de mongoose
const ProfesionalSchema = new Schema<IProfesionalMongoose>({
    idUsuario: { type: String, required: true },
    etiqueta: { type: String, required: true },                                     // TProfesionalEtiqueta
    fotoPerfil: { type: String, required: false, default: defaultValue.fotoPerfil },
    fotoPortada: { type: String, required: false, default: defaultValue.fotoPortada },
    contactos: { type: Array as unknown as TProfesionalContacto[], required: true },                                     // IProfesionalContacto[]
    estado: { type: String, required: false, default: defaultValue.estado },                                       // TProfesionalEstado
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

export const ProfesionalModel = model<IProfesionalMongoose>(
    constants.nombreStore.profesional,
    ProfesionalSchema
);
