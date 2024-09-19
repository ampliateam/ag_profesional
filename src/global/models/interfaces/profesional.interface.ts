import {
    TProfesionalContactoTipo,
    TProfesionalEstado,
    TProfesionalEtiqueta,
} from "@global/models/types";

interface IProfesionalContacto {
    codigoTelefono: string | null;
    contacto: string;
    tipo: TProfesionalContactoTipo;
};

export interface IProfesional {
    _id: string;
    idUsuario: string;
    etiqueta: TProfesionalEtiqueta;
    fotoPerfil: string;
    fotoPortada: string;
    contactos: IProfesionalContacto[];
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
    contactos?: IProfesionalContacto[];
    estado?: TProfesionalEstado;
    fechaCreacion?: Date;
    fechaEliminacion?: Date | null;
};
