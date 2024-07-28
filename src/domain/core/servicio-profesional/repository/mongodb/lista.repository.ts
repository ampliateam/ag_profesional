import { ServicioProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToServicioProfesional } from "@domain/_helpers";

// Tener cuidado mientras se use el plan de mongodb "pago-por-uso"
export const consultaPersonalizada = async (filtros: object) => {
    const listaModelMongo = await ServicioProfesionalModel.find(filtros);
    return listaModelMongo.map(v => mongoToServicioProfesional(v));
}

export const obtenerListaPorIds = async (listaId: string[]) => {
    const filtros = {};
    const or = [];
    listaId.map(id => or.push({ _id: id }));
    filtros['$or'] = or;

    const listaMongo = await ServicioProfesionalModel.find(filtros);
    return listaMongo.map(v => mongoToServicioProfesional(v));
}
