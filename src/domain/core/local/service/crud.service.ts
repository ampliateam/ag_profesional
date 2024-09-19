import { ILocal } from '@global/models/interfaces';
import {
    CrearLocalDTO,
    BuscarLocalDTO,
    ActualizarLocalDTO,
} from '../dto';
import * as repository from '../repository/mongodb';

export const crear = async (dto: CrearLocalDTO): Promise<ILocal> => {
    return await repository.crud.crear(dto);
}

export const obtener = async (dto: BuscarLocalDTO): Promise<ILocal> => {
    return await repository.crud.obtener(dto);
}

export const actualizar = async (dto: ActualizarLocalDTO): Promise<ILocal> => {
    return await repository.crud.actualizar(dto);
}
