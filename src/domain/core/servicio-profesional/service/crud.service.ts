import { IServicioProfesional } from '@global/models/ag_profesional';
import {
    CrearServicioProfesionalDTO,
    BuscarServicioProfesionalDTO,
    ActualizarServicioProfesionalDTO,
} from '../dto';
import * as repository from '../repository/mongodb';

export const crear = async (dto: CrearServicioProfesionalDTO): Promise<IServicioProfesional> => {
    return await repository.crud.crear(dto);
}

export const obtener = async (dto: BuscarServicioProfesionalDTO): Promise<IServicioProfesional> => {
    return await repository.crud.obtener(dto);
}

export const actualizar = async (dto: ActualizarServicioProfesionalDTO): Promise<IServicioProfesional> => {
    return await repository.crud.actualizar(dto);
}
