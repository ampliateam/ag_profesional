import * as repository from '../repository/mongodb';

export const obtenerListaPorIds = async (listaId: string[]) => {
    return await repository.obtenerListaPorIds(listaId);
}
