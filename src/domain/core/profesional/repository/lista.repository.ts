import { ProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToProfesional } from "@domain/_helpers";

// Tener cuidado mientras se use el plan de mongodb "pago-por-uso"
export const consultaPersonalizada = async (filtros: object) => {
    const listaModelMongo = await ProfesionalModel.find(filtros);
    return listaModelMongo.map(v => mongoToProfesional(v));
}

export const obtenerListaPorIds = async (listaId: string[]) => {
    const filtros = {};
    const or = [];
    listaId.map(id => or.push({ _id: id }));
    filtros['$or'] = or;

    const listaModelMongo = await ProfesionalModel.find(filtros);
    return listaModelMongo.map(v => mongoToProfesional(v));
}
