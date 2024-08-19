import {
    IProfesional,
    IProfesionalOpcional
} from "@global/models/interfaces";
import { TProfesionalEtiqueta } from "@global/models/types";

export interface CrearProfesionalDTO {
    profesional: IProfesional;
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
