import { ConfigMensajeriaProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToConfigMensajeriaProfesional } from "@domain/_helpers";

export const consultaPersonalizada = async (filtros: object) => {
    const listaModelMongo = await ConfigMensajeriaProfesionalModel.find(filtros);
    return listaModelMongo.map(v => mongoToConfigMensajeriaProfesional(v));
}

export const obtenerListaPorIds = async (listaId: string[]) => {
    const filtros = {};
    const or = [];
    listaId.map(id => or.push({ _id: id }));
    filtros['$or'] = or;

    const listaModelMongo = await ConfigMensajeriaProfesionalModel.find(filtros);
    return listaModelMongo.map(v => mongoToConfigMensajeriaProfesional(v));
}
