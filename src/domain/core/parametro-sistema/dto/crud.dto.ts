import { IParametroSistemaOpcional } from '@global/models/ag_profesional';

export interface CrearParametroSistemaDTO {
    nuevo: IParametroSistemaOpcional;
};

export interface BuscarParametroSistemaDTO {
    _id?: string;
    parametroBusqueda?: string;
};

export interface ActualizarParametroSistemaDTO {
    buscarPor: BuscarParametroSistemaDTO;
    actualizado: IParametroSistemaOpcional;
};
