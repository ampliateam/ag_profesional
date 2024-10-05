import { ILocal } from "@global/models/ag_profesional";
import { EliminarLogicamenteLocalDTO } from "../dto";
import * as repository from '../repository/mongodb';

export const eliminarLogicamente = async (dto: EliminarLogicamenteLocalDTO): Promise<ILocal> => {
    return await repository.crud.actualizar({
        buscarPor: dto.buscarPor,
        actualizado: {
            estado: 'eliminado',
            fechaEliminacion: dto.fechaEliminacion || new Date()
        },
    });
}
