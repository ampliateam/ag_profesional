import * as repository from '../repository';

export const obtenerListaPorIds = async (listaId: string[]) => {
    return await repository.obtenerListaPorIds(listaId);
}
