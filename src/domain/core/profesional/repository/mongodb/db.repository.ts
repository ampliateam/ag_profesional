import { ProfesionalModel } from "@domain/_connections/mongodb";
import { manejadorDeErrorMongodb } from "@domain/_errors";
import { mongoToProfesional } from "@domain/_helpers";

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

// Tener cuidado mientras se use el plan de mongodb "pago-por-uso"
export const obtener = async (filtros: any) => {
  try {
    const listaModelMongo = await ProfesionalModel.find(filtros);
    return listaModelMongo.map(v => mongoToProfesional(v));
  } catch (error) {
    return manejadorDeError(error);    
  }
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    await ProfesionalModel.updateMany(filtros, data, opcionesAux);
    const profesionalesActualizados = await ProfesionalModel.find(filtros);
    return profesionalesActualizados.map(p => {
    return Object.assign({}, mongoToProfesional(p), data);
  });
  } catch (error) {
    return manejadorDeError(error);    
  }
};

export const obtenerPorID = async (id: string) => {
  try {
    const modelMongo = await ProfesionalModel.findById(id);
    return mongoToProfesional(modelMongo);
  } catch (error) {
    return manejadorDeError(error);    
  }
};

export const actualizarPorID = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    const profesionalesActualizados = await ProfesionalModel.find(filtros);
    await ProfesionalModel.findByIdAndUpdate(profesionalesActualizados[0]._id, data, opcionesAux);
    return Object.assign({}, mongoToProfesional(profesionalesActualizados[0]), data);
  } catch (error) {
    return manejadorDeError(error);    
  }
};
