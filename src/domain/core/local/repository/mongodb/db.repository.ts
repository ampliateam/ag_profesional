import { LocalModel } from "@domain/_connections/mongodb";
import { mongoToLocal } from "@domain/_helpers";

// Tener cuidado mientras se use el plan de mongodb "pago-por-uso"
export const obtener = async (filtros: any) => {
  const listaModelMongo = await LocalModel.find(filtros);
  return listaModelMongo.map(v => mongoToLocal(v));
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  await LocalModel.updateMany(filtros, data, opcionesAux);
  const actualizados = await LocalModel.find(filtros);
  return actualizados.map(p => {
    return Object.assign({}, mongoToLocal(p), data);
  });
};

export const obtenerPorID = async (id: string) => {
  const modelMongo = await LocalModel.findById(id);
  return mongoToLocal(modelMongo);
};

export const actualizarPorID = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  const actualizados = await LocalModel.find(filtros);
  await LocalModel.findByIdAndUpdate(actualizados[0]._id, data, opcionesAux);
  return Object.assign({}, mongoToLocal(actualizados[0]), data);
};
