import { IProfesional } from "@global/models/interfaces";
import * as repository from '../repository/mongodb';

export const obtenerListaPorIds = async (listaId: string[]): Promise<IProfesional[]> => {
    return await repository.obtenerListaPorIds(listaId);
}
