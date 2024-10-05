import { IProfesional } from "@global/models/ag_profesional";
import { EliminarLogicamenteProfesionalDTO } from "../dto";
import * as repository from '../repository/mongodb';

export const eliminarLogicamente = async (dto: EliminarLogicamenteProfesionalDTO): Promise<IProfesional> => {
    return await repository.crud.actualizar({
        buscarPor: dto.buscarPor,
        actualizado: {
            estado: 'eliminado',
            fechaEliminacion: dto.fechaEliminacion || new Date()
        },
    });
}
