import {
    TClienteContactoTipo,
    TClienteContactoPrioridad,
    TClienteEstado,
    TClienteMensajeRecordatorioTipo,
} from '@global/models/types';

export interface IClienteContacto {
    codigoAccesoInternacional: string | null;
    contacto: string;
    tipo: TClienteContactoTipo;
    prioridad: TClienteContactoPrioridad;
}

export interface IClienteDireccion {
    referencia: string;
    ubicacion: [number, number] | null;
}

export interface IClienteRecordatorio {
    recordatorioHabilitado: boolean;
    recordatorioDobleHabilitado: boolean;
    tipoMensaje: TClienteMensajeRecordatorioTipo;
    mensaje: string;
}

export interface ICliente {
    id: string;
    idUsuario: string;
    idProfesional: string;
    nombre: string;
    apellido: string;
    nota: string;
    contactos: IClienteContacto[];
    direccion: IClienteDireccion;
    recordatorio: IClienteRecordatorio;
    fechaNacimiento: Date | null;
    estado: TClienteEstado;
    fechaCreacion: Date;
    fechaEliminacion: Date | null;
}
