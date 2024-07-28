import { IServicioProfesional } from "@global/models/interfaces";
import * as repository from '../repository/mongodb';

export const obtenerListaPorIds = async (listaId: string[]): Promise<IServicioProfesional[]> => {
    return await repository.obtenerListaPorIds(listaId);
}
