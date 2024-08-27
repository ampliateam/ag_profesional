import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';

// Guardar el valor por defecto de cada campo aqui
const defaultValue = {
    direccion: { referencia: '', ubicacion: [0,0] },
    fechaEliminacion: null,
};

const ProfesionalSchema = new Schema({
    idUsuario: { type: String, required: true },
    contactos: { type: Array, required: true },                                     // IProfesionalContacto[]
    direccion: { type: Object, required: false, default: defaultValue.direccion },  // IProfesionalDireccion
    etiqueta: { type: String, required: true },                                     // TProfesionalEtiqueta
    estado: { type: String, required: true },                                       // TProfesionalEstado
    fechaCreacion: { type: Date, required: true },
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
    const doc = this;
    const exists = await ProfesionalModel.findOne({
        _id: { $ne: doc._id }, // Excluir el documento actual en caso de actualización
        idUsuario: doc.idUsuario,
        etiqueta: doc.etiqueta,
        estado: { $in: ['habilitado', 'deshabilitado'] },
    });

    if (!exists) return next();

    const err = new Error('Ya existe un documento con el mismo idUsuario, etiqueta y estado.');
    return next(err);
});

export const ProfesionalModel = model(constants.nombreStore.profesional, ProfesionalSchema);
