import { BuscarServicioProfesionalDTO } from "./crud.dto";

export interface EliminarLogicamenteServicioProfesionalDTO {
    buscarPor: BuscarServicioProfesionalDTO;
    fechaEliminacion: Date;
}
