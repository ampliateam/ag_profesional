import { BuscarProfesionalDTO } from "./crud.dto";

export interface EliminarLogicamenteProfesionalDTO {
    buscarPor: BuscarProfesionalDTO;
    fechaEliminacion: Date;
}
