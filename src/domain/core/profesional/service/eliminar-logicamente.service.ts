import { IProfesional } from "@global/models/interfaces";
import { EliminarLogicamenteProfesionalDTO } from "../dto";
import * as repository from '../repository';

export const eliminarLogicamente = async (dto: EliminarLogicamenteProfesionalDTO): Promise<IProfesional> => {
    return await repository.crud.actualizar({
        buscarPor: dto.buscarPor,
        actualizado: {
            estado: 'eliminado',
            fechaEliminacion: dto.fechaEliminacion
        },
    });
}
