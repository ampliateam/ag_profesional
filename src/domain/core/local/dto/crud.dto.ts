import { ILocalOpcional } from "@global/models/interfaces";

export interface CrearLocalDTO {
    local: ILocalOpcional;
};

export interface BuscarLocalDTO {
    _id?: string;
    idProfesional?: string;
};

export interface ActualizarLocalDTO {
    buscarPor: BuscarLocalDTO;
    actualizado: ILocalOpcional;
};
