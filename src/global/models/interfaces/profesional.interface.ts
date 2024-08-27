import {
    TProfesionalContactoTipo,
    TProfesionalEstado,
    TProfesionalEtiqueta,
} from "@global/models/types";

interface IProfesionalContacto {
    codigoTelefono: string | null;
    contacto: string;
    tipo: TProfesionalContactoTipo;
}

interface IProfesionalDireccion {
    referencia: string;
    ubicacion: [number, number] | null;
}

export interface IProfesional {
    _id: string;
    idUsuario: string;
    contactos: IProfesionalContacto[];
    direccion: IProfesionalDireccion;
    etiqueta: TProfesionalEtiqueta;
    estado: TProfesionalEstado;
    fechaCreacion: Date;
    fechaEliminacion: Date | null;
}

export interface IProfesionalOpcional {
    _id?: string;
    idUsuario?: string;
    contactos?: IProfesionalContacto[];
    direccion?: IProfesionalDireccion;
    etiqueta?: TProfesionalEtiqueta;
    estado?: TProfesionalEstado;
    fechaCreacion?: Date;
    fechaEliminacion?: Date | null;
}
