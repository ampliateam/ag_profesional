import { ServicioProfesionalModel } from "@domain/_connections/mongodb";
import { manejadorDeErrorMongodb } from "@domain/_errors";
import { mongoToServicioProfesional } from "@domain/_helpers";

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

// Tener cuidado mientras se use el plan de mongodb "pago-por-uso"
export const obtener = async (filtros: any) => {
  try {
    const listaModelMongo = await ServicioProfesionalModel.find(filtros);
    return listaModelMongo.map(v => mongoToServicioProfesional(v));
  } catch (error) {
    return manejadorDeError(error);    
  }
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    await ServicioProfesionalModel.updateMany(filtros, data, opcionesAux);
    const actualizados = await ServicioProfesionalModel.find(filtros);
    return actualizados.map(p => mongoToServicioProfesional(p));
  } catch (error) {
    return manejadorDeError(error);    
  }
};
