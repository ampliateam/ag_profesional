import { IProfesional } from "@global/models/interfaces";
import * as repository from '../repository/mongodb';

export const obtener = async (dto: any): Promise<IProfesional[]> => {
  return await repository.db.obtener(dto);
};

export const actualizar = async (dto: any, data: any): Promise<IProfesional[]> => {
  return await repository.db.actualizar(dto, data);
};

export const obtenerPorID = async (id: string) => {
  return await repository.db.obtenerPorID(id);
};

export const actualizarPorID = async (dto: any, data: any) => {
  return await repository.db.actualizarPorID(dto, data);
};
