import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';

const dv = {
  descripcion: '',
  direccion: null,
  estado: 'habilitado',
  fechaCreacion: Date.now,
  fechaEliminacion: null,
};

const LocalSchema = new Schema({
  idProfesional: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: false, default: dv.descripcion, },
  direccion: { type: Object, required: false, default: dv.direccion, },
  contactos: { type: Array, required: true },
  estado: { type: String, required: false, default: dv.estado, },
  fechaCreacion: { type: String, required: false, default: dv.fechaCreacion, },
  fechaEliminacion: { type: String, required: false, default: dv.fechaEliminacion, },
}, { versionKey: false });

export const LocalModel = model(constants.nombreStore.locales, LocalSchema);
