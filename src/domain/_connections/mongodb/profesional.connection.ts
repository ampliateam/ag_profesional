import { Schema, Types, model } from 'mongoose';
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
    estado: { type: String, required: true },                                       // TProfesionalEstado
    fechaCreacion: { type: Date, required: true },
    fechaEliminacion: { type: Date, required: false, default: defaultValue.fechaEliminacion },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
});

// Duplicate the ID field.
ProfesionalSchema.virtual('id').set(function(v: string){
    this._id = new Types.ObjectId(v);
});
ProfesionalSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

export const ProfesionalModel = model(constants.nombreStore.profesional, ProfesionalSchema);
