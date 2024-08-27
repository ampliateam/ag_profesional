import { IServicioProfesional } from "@global/models/interfaces";
import { EliminarLogicamenteServicioProfesionalDTO } from "../dto";
import * as repository from '../repository/mongodb';

export const eliminarLogicamente = async (dto: EliminarLogicamenteServicioProfesionalDTO): Promise<IServicioProfesional> => {
    return await repository.crud.actualizar({
        buscarPor: dto.buscarPor,
        actualizado: {
            estado: 'eliminado',
            fechaEliminacion: dto.fechaEliminacion || new Date()
        },
    });
}
