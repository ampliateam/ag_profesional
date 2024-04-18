import {
    IServicioProfesional,
    IServicioProfesionalOpcional
} from "@global/models/interfaces";

export interface CrearServicioProfesionalDTO {
    servicioProfesional: IServicioProfesional;
}

export interface BuscarServicioProfesionalDTO {
    id?: string;
    nombreServicioPorProfesional?: {
        idProfesional: string,
        nombreServicio: string,
    };
}

export interface ActualizarServicioProfesionalDTO {
    buscarPor: BuscarServicioProfesionalDTO;
    actualizado: IServicioProfesionalOpcional;
}
