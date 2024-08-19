import {
    IServicioProfesional,
    IServicioProfesionalOpcional
} from "@global/models/interfaces";

export interface CrearServicioProfesionalDTO {
    servicioProfesional: IServicioProfesional;
}

export interface BuscarServicioProfesionalDTO {
    _id?: string;
    nombreServicioPorProfesional?: {
        idProfesional: string,
        nombreServicio: string,
    };
}

export interface ActualizarServicioProfesionalDTO {
    buscarPor: BuscarServicioProfesionalDTO;
    actualizado: IServicioProfesionalOpcional;
}
