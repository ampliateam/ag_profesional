import { TLocalContactoTipo, TLocalEstado } from '@global/models/types';

interface ILocalDireccion {
  referencia: string;
  ubicacion: [number, number] | null;
};

interface ILocalContacto {
  codigoTelefono: string | null;
  contacto: string;
  tipo: TLocalContactoTipo;
};

export interface ILocal {
  _id: string;
  idProfesional: string;
  nombre: string;
  descripcion: string;
  direccion: ILocalDireccion | null;
  contactos: ILocalContacto[];
  estado: TLocalEstado;
  fechaCreacion: Date;
  fechaEliminacion: Date | null;
};

export interface ILocalOpcional {
  _id?: string;
  idProfesional?: string;
  nombre?: string;
  descripcion?: string;
  direccion?: ILocalDireccion;
  contactos?: ILocalContacto[];
  estado?: TLocalEstado;
  fechaCreacion?: Date;
  fechaEliminacion?: Date | null;
}
