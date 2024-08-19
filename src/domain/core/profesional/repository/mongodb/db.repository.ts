import { ProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToProfesional } from "@domain/_helpers";

// Tener cuidado mientras se use el plan de mongodb "pago-por-uso"
export const obtener = async (filtros: any) => {
  const listaModelMongo = await ProfesionalModel.find(filtros);
  return listaModelMongo.map(v => mongoToProfesional(v));
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  await ProfesionalModel.updateMany(filtros, data, opcionesAux);
  const profesionalesActualizados = await ProfesionalModel.find(filtros);
  return profesionalesActualizados.map(p => {
    return Object.assign({}, mongoToProfesional(p), data);
  });
};

export const obtenerPorID = async (id: string) => {
  const modelMongo = await ProfesionalModel.findById(id);
  return mongoToProfesional(modelMongo);
};

export const actualizarPorID = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  const profesionalesActualizados = await ProfesionalModel.find(filtros);
  await ProfesionalModel.findByIdAndUpdate(profesionalesActualizados[0]._id, data, opcionesAux);
  return Object.assign({}, mongoToProfesional(profesionalesActualizados[0]), data);
};
