import { TServicioProfesionalEstado } from '@global/models/types';

export interface IServicioProfesional {
    id: string;
    idProfesional: string;
    nombreServicio: string;
    observacion: string;
    estado: TServicioProfesionalEstado;
    fechaCreacion: Date;
}

export interface IServicioProfesionalOpcional {
    id?: string;
    idProfesional?: string;
    nombreServicio?: string;
    observacion?: string;
    estado?: TServicioProfesionalEstado;
    fechaCreacion?: Date;
}
