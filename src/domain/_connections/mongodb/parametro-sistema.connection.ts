import { Schema, Types, model } from 'mongoose';
import { constants } from '@global/configs/constants';

const defaultValue = {
    _id: () => new Types.ObjectId().toHexString(),
}

const ParametroSistemaSchema = new Schema({
    _id: { type: Schema.Types.Mixed, default: defaultValue._id },
    parametroBusqueda: { type: String, required: true, unique: true },
    valor: { type: String, required: true },
    observacion: { type: String, required: true },
}, {
    versionKey: false,
    _id: false,
});

export const ParametroSistemaModel = model(constants.nombreStore.parametroSistema, ParametroSistemaSchema);
