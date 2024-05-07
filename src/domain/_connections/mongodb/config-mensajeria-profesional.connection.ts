import { Schema, Types, model } from 'mongoose';
import { constants } from '@global/configs/constants';

// Guardar el valor por defecto de cada campo aqui
const defaultValue = {
  packMensajeria: {
    correo: {
      totalHistorico: 0,
      porElemento: {
        disponible: 0,
        totalHistorico: 0,
        utilizadoHistorico: 0,
      },
    },
    sms: {
      totalHistorico: 0,
      porElemento: {
        disponible: 0,
        totalHistorico: 0,
        utilizadoHistorico: 0,
      },
    },
    whatsapp: {
      totalHistorico: 0,
      porElemento: {
        disponible: 0,
        totalHistorico: 0,
        utilizadoHistorico: 0,
      },
    }
  },
  recordatorioManualParaCliente: {
    habilitado: false,
    tipoMedio: 'correo',
  },
  fechaCreacion: Date.now,
};

const ConfigMensajeriaProfesionalSchema = new Schema(
  {
    idUsuario: { type: String, required: true, unique: true },
    idProfesional: { type: String, required: true, unique: true },
    packMensajeria: { type: Object, required: false, default: defaultValue.packMensajeria },
    recordatorioManualParaCliente: {
      type: Object,
      required: false,
      default: defaultValue.recordatorioManualParaCliente,
    },
    fechaCreacion: { type: Date, required: false, default: defaultValue.fechaCreacion },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

// Duplicate the ID field.
ConfigMensajeriaProfesionalSchema.virtual('id').set(function (v: string) {
  this._id = new Types.ObjectId(v);
});
ConfigMensajeriaProfesionalSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const ConfigMensajeriaProfesionalModel = model(
  constants.nombreStore.configMensajeriaProfesional,
  ConfigMensajeriaProfesionalSchema
);
