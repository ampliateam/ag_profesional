import { IServicioProfesional } from '@global/models/interfaces';
import {
    CrearServicioProfesionalDTO,
    BuscarServicioProfesionalDTO,
    ActualizarServicioProfesionalDTO,
} from '../dto';
import * as repository from '../repository';

export const crear = async (dto: CrearServicioProfesionalDTO): Promise<IServicioProfesional> => {
    return await repository.crud.crear(dto);
}

export const obtener = async (dto: BuscarServicioProfesionalDTO): Promise<IServicioProfesional> => {
    return await repository.crud.obtener(dto);
}

export const actualizar = async (dto: ActualizarServicioProfesionalDTO): Promise<IServicioProfesional> => {
    return await repository.crud.actualizar(dto);
}

export const eliminar = async (dto: BuscarServicioProfesionalDTO): Promise<IServicioProfesional> => {
    return await repository.crud.eliminar(dto);
}
