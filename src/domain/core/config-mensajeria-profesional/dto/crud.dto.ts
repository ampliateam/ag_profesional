import {
  IConfigMensajeriaProfesional,
  IConfigMensajeriaProfesionalOpcional,
} from '@global/models/interfaces';

export interface CrearConfigMensajeriaProfesionalDTO {
  configMensajeriaProfesional: IConfigMensajeriaProfesional;
}

export interface BuscarConfigMensajeriaProfesionalDTO {
  id?: string;
  idUsuario?: string;
  idProfesional?: string;
}

export interface ActualizarConfigMensajeriaProfesionalDTO {
  buscarPor: BuscarConfigMensajeriaProfesionalDTO;
  actualizado: IConfigMensajeriaProfesionalOpcional;
}
