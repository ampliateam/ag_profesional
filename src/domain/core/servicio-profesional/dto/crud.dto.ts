import { IServicioProfesionalOpcional } from "@global/models/interfaces";
import { TServicioProfesionalEstado } from "@global/models/types";

export interface CrearServicioProfesionalDTO {
    servicioProfesional: IServicioProfesionalOpcional;
}

export interface BuscarServicioProfesionalDTO {
    _id?: string;
    nombreServicioPorProfesional?: {
        idProfesional: string,
        nombreServicio: string,
        estado: TServicioProfesionalEstado
    };
}

export interface ActualizarServicioProfesionalDTO {
    buscarPor: BuscarServicioProfesionalDTO;
    actualizado: IServicioProfesionalOpcional;
}
