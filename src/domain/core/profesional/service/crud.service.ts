import { IProfesional } from '@global/models/interfaces';
import {
    CrearProfesionalDTO,
    BuscarProfesionalDTO,
    ActualizarProfesionalDTO,
} from '../dto';
import * as repository from '../repository';

export const crear = async (dto: CrearProfesionalDTO): Promise<IProfesional> => {
    return await repository.crud.crear(dto);
}

export const obtener = async (dto: BuscarProfesionalDTO): Promise<IProfesional> => {
    return await repository.crud.obtener(dto);
}

export const actualizar = async (dto: ActualizarProfesionalDTO): Promise<IProfesional> => {
    return await repository.crud.actualizar(dto);
}
