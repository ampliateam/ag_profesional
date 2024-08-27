import { IConfigMensajeriaProfesional } from "@global/models/interfaces";
import * as repository from '../repository/mongodb';

export const obtener = async (dto: any): Promise<IConfigMensajeriaProfesional[]> => {
  return await repository.db.obtener(dto);
};

export const actualizar = async (dto: any, data: any): Promise<IConfigMensajeriaProfesional[]> => {
  return await repository.db.actualizar(dto, data);
};
