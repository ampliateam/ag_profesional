import { ConfigMensajeriaProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToConfigMensajeriaProfesional } from "@domain/_helpers";

// Tener cuidado mientras se use el plan de mongodb "pago-por-uso"
export const obtener = async (filtros: any) => {
  const listaModelMongo = await ConfigMensajeriaProfesionalModel.find(filtros);
  return listaModelMongo.map(v => mongoToConfigMensajeriaProfesional(v));
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  await ConfigMensajeriaProfesionalModel.updateMany(filtros, data, opcionesAux);
  const actualizados = await ConfigMensajeriaProfesionalModel.find(filtros);
  return actualizados.map(p => mongoToConfigMensajeriaProfesional(p));
};
