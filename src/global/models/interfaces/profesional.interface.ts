import {
    TProfesionalContactoPrioridad,
    TProfesionalContactoTipo,
    TProfesionalEstado
} from "@global/models/types";

interface IProfesionalContacto {
    codigoTelefono: string | null;
    contacto: string;
    tipo: TProfesionalContactoTipo;
    prioridad: TProfesionalContactoPrioridad;
}

interface IProfesionalDireccion {
    referencia: string;
    ubicacion: [number, number] | null;
}

export interface IProfesional {
    id: string;
    idUsuario: string;
    contactos: IProfesionalContacto[];
    direccion: IProfesionalDireccion;
    estado: TProfesionalEstado;
    fechaCreacion: Date;
    fechaEliminacion: Date | null;
}

export interface IProfesionalOpcional {
    id?: string;
    idUsuario?: string;
    contactos?: IProfesionalContacto[];
    direccion?: IProfesionalDireccion;
    estado?: TProfesionalEstado;
    fechaCreacion?: Date;
    fechaEliminacion?: Date | null;
}
