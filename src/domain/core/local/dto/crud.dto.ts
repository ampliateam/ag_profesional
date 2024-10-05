import { ILocalOpcional } from "@global/models/ag_profesional";

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
