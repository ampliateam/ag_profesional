import { IProfesional } from "@global/models/interfaces";
import * as repository from '../repository';

export const obtenerListaPorIds = async (listaId: string[]): Promise<IProfesional[]> => {
    return await repository.obtenerListaPorIds(listaId);
}
