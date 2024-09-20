import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';
import { ILocal } from '@global/models/interfaces';
import { TLocalContacto, TLocalEstado } from '@global/models/types';

// Definir la interfaz para el documento
interface ILocalMongoose extends Document, Omit<ILocal, '_id'> {};

// Guardar el valor por defecto de cada campo aqui (para los required=false)
const dv = {
  descripcion: '',
  direccion: null,
  estado: 'habilitado' as TLocalEstado,
  fechaCreacion: Date.now,
  fechaEliminacion: null,
};

// Schema de mongoose
const LocalSchema = new Schema<ILocalMongoose>({
  idProfesional: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: false, default: dv.descripcion, },
  direccion: { type: Object, required: false, default: dv.direccion, },
  contactos: { type: Array as unknown as TLocalContacto[], required: true },
  estado: { type: String, required: false, default: dv.estado, },
  fechaCreacion: { type: Date, required: false, default: dv.fechaCreacion, },
  fechaEliminacion: { type: Date, required: false, default: dv.fechaEliminacion, },
}, { versionKey: false });

export const LocalModel = model<ILocalMongoose>(constants.nombreStore.locales, LocalSchema);
