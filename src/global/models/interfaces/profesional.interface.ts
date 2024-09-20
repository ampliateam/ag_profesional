import {
    TProfesionalContacto,
    TProfesionalEstado,
    TProfesionalEtiqueta,
} from "@global/models/types";

export interface IProfesional {
    _id: string;
    idUsuario: string;
    etiqueta: TProfesionalEtiqueta;
    fotoPerfil: string;
    fotoPortada: string;
    contactos: TProfesionalContacto[];
    estado: TProfesionalEstado;
    fechaCreacion: Date;
    fechaEliminacion: Date | null;
};

export interface IProfesionalOpcional {
    _id?: string;
    idUsuario?: string;
    etiqueta?: TProfesionalEtiqueta;
    fotoPerfil?: string;
    fotoPortada?: string;
    contactos?: TProfesionalContacto[];
    estado?: TProfesionalEstado;
    fechaCreacion?: Date;
    fechaEliminacion?: Date | null;
};
