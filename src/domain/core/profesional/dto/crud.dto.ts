import {
    IProfesional,
    IProfesionalOpcional
} from "@global/models/interfaces";

export interface CrearProfesionalDTO {
    profesional: IProfesional;
}

export interface BuscarProfesionalDTO {
    id?: string;
    idUsuario?: string;
}

export interface ActualizarProfesionalDTO {
    buscarPor: BuscarProfesionalDTO;
    actualizado: IProfesionalOpcional;
}
