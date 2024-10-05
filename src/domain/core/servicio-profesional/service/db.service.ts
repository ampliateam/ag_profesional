import { IServicioProfesional } from "@global/models/ag_profesional";
import * as repository from '../repository/mongodb';

export const obtener = async (dto: any): Promise<IServicioProfesional[]> => {
  return await repository.db.obtener(dto);
};

export const actualizar = async (dto: any, data: any): Promise<IServicioProfesional[]> => {
  return await repository.db.actualizar(dto, data);
};
