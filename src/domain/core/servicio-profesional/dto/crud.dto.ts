import { IServicioProfesionalOpcional, TServicioProfesionalEstado } from "@global/models/ag_profesional";

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
