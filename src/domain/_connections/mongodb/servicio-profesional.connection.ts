import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';

// Guardar el valor por defecto de cada campo aqui
const dv = {
    fechaEliminacion: null,
};

const ServicioProfesionalSchema = new Schema({
    idProfesional: { type: String, required: true },
    nombreServicio: { type: String, required: true },
    observacion: { type: String, required: true },
    estado: { type: String, required: true },           // TServicioProfesionalEstado
    fechaCreacion: { type: Date, required: true },
    fechaEliminacion: { type: Date, required: false, default: dv.fechaEliminacion },
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
    const doc = this;
    const exists = await ServicioProfesionalModel.findOne({
        _id: { $ne: doc._id }, // Excluir el documento actual en caso de actualización
        idProfesional: doc.idProfesional,
        nombreServicio: doc.nombreServicio,
        estado: { $in: ['habilitado', 'deshabilitado'] },
    });

    if (!exists) return next();

    const err = new Error('Ya existe un documento con el mismo idProfesional, nombreServicio y estado.');
    return next(err);
});

export const ServicioProfesionalModel = model(constants.nombreStore.servicioProfesional, ServicioProfesionalSchema);
