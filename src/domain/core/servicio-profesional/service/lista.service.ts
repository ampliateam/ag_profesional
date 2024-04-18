import { IServicioProfesional } from "@global/models/interfaces";
import * as repository from '../repository';

export const obtenerListaPorIds = async (listaId: string[]): Promise<IServicioProfesional[]> => {
    return await repository.obtenerListaPorIds(listaId);
}
