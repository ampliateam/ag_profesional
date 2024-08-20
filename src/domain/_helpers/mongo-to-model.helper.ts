import {
    IConfigMensajeriaProfesional,
    IProfesional,
    IServicioProfesional
} from "@global/models/interfaces";
import { IParametroSistema } from "@domain/_models/interfaces";

const mongoToModel = (mongo: any) => {
    if (!mongo) return null;

    const mongoObj = mongo.toObject();
    const mongoKeys = Object.keys(mongoObj);

    const obj = {};
    mongoKeys.map(key => obj[key] = mongoObj[key]);
    obj['_id'] = obj['_id'].toString();

    return obj;
}

export const mongoToParametroBusqueda = (mongo: any): IParametroSistema => {
    return mongoToModel(mongo) as IParametroSistema;
}

export const mongoToProfesional = (mongo: any): IProfesional => {
    return mongoToModel(mongo) as IProfesional;
}

export const mongoToServicioProfesional = (mongo: any): IServicioProfesional => {
    return mongoToModel(mongo) as IServicioProfesional;
}

export const mongoToConfigMensajeriaProfesional = (mongo: any): IConfigMensajeriaProfesional => {
    return mongoToModel(mongo) as IConfigMensajeriaProfesional;
}
