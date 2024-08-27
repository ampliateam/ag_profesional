import { ServicioProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToServicioProfesional } from "@domain/_helpers";

// Tener cuidado mientras se use el plan de mongodb "pago-por-uso"
export const obtener = async (filtros: any) => {
  const listaModelMongo = await ServicioProfesionalModel.find(filtros);
  return listaModelMongo.map(v => mongoToServicioProfesional(v));
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  await ServicioProfesionalModel.updateMany(filtros, data, opcionesAux);
  const actualizados = await ServicioProfesionalModel.find(filtros);
  return actualizados.map(p => mongoToServicioProfesional(p));
};
