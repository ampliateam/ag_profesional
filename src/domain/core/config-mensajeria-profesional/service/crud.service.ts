import { IConfigMensajeriaProfesional } from '@global/models/interfaces';
import * as repository from '../repository';
import {
    ActualizarConfigMensajeriaProfesionalDTO,
    BuscarConfigMensajeriaProfesionalDTO,
    CrearConfigMensajeriaProfesionalDTO
} from "../dto";

export const crear = async (dto: CrearConfigMensajeriaProfesionalDTO): Promise<IConfigMensajeriaProfesional> => {
    return await repository.crud.crear(dto);
}

export const obtener = async (dto: BuscarConfigMensajeriaProfesionalDTO): Promise<IConfigMensajeriaProfesional> => {
    return await repository.crud.obtener(dto);
}

export const actualizar = async (dto: ActualizarConfigMensajeriaProfesionalDTO): Promise<IConfigMensajeriaProfesional> => {
    return await repository.crud.actualizar(dto);
}
