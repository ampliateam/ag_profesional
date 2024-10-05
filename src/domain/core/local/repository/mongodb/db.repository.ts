import { LocalModel } from "@domain/_connections/mongodb";
import { manejadorDeErrorMongodb } from "@domain/_errors";
import { mongoToLocal } from "@domain/_helpers";

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

// Tener cuidado mientras se use el plan de mongodb "pago-por-uso"
export const obtener = async (filtros: any) => {
  try {
    const listaModelMongo = await LocalModel.find(filtros);
    return listaModelMongo.map(v => mongoToLocal(v));
  } catch (error) {
    return manejadorDeError(error);    
  }
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    await LocalModel.updateMany(filtros, data, opcionesAux);
    const actualizados = await LocalModel.find(filtros);
    return actualizados.map(p => {
    return Object.assign({}, mongoToLocal(p), data);
  });
  } catch (error) {
    return manejadorDeError(error);    
  }
};

export const obtenerPorID = async (id: string) => {
  try {
    const modelMongo = await LocalModel.findById(id);
    return mongoToLocal(modelMongo);
  } catch (error) {
    return manejadorDeError(error);    
  }
};

export const actualizarPorID = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    const actualizados = await LocalModel.find(filtros);
    await LocalModel.findByIdAndUpdate(actualizados[0]._id, data, opcionesAux);
    return Object.assign({}, mongoToLocal(actualizados[0]), data);
  } catch (error) {
    return manejadorDeError(error);    
  }
};
