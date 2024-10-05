import {
  TLocalContacto,
  TLocalDireccion,
  TLocalEstado
} from '@global/models/ag_profesional';

export interface ILocal {
  _id: string;
  idProfesional: string;
  nombre: string;
  descripcion: string;
  direccion: TLocalDireccion | null;
  contactos: TLocalContacto[];
  estado: TLocalEstado;
  fechaCreacion: Date;
  fechaEliminacion: Date | null;
};

export interface ILocalOpcional {
  _id?: string;
  idProfesional?: string;
  nombre?: string;
  descripcion?: string;
  direccion?: TLocalDireccion;
  contactos?: TLocalContacto[];
  estado?: TLocalEstado;
  fechaCreacion?: Date;
  fechaEliminacion?: Date | null;
}
