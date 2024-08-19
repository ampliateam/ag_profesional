import { TServicioProfesionalEstado } from '@global/models/types';

export interface IServicioProfesional {
    _id: string;
    idProfesional: string;
    nombreServicio: string;
    observacion: string;
    estado: TServicioProfesionalEstado;
    fechaCreacion: Date;
}

export interface IServicioProfesionalOpcional {
    _id?: string;
    idProfesional?: string;
    nombreServicio?: string;
    observacion?: string;
    estado?: TServicioProfesionalEstado;
    fechaCreacion?: Date;
}
