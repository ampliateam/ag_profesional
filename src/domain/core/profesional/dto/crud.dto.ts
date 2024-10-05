import { IProfesionalOpcional, TProfesionalEtiqueta } from "@global/models/ag_profesional";

export interface CrearProfesionalDTO {
    profesional: IProfesionalOpcional;
}

export interface BuscarProfesionalDTO {
    _id?: string;
    idUsuario?: string;
    etiqueta?: TProfesionalEtiqueta;
}

export interface ActualizarProfesionalDTO {
    buscarPor: BuscarProfesionalDTO;
    actualizado: IProfesionalOpcional;
}
