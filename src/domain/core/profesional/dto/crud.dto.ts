import { IProfesionalOpcional } from "@global/models/interfaces";
import { TProfesionalEtiqueta } from "@global/models/types";

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
