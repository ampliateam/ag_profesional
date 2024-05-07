import { TMensajeriaMedioTipo } from '@global/models/types';

// PACK
interface IPackMensajeria {
  correo: {
    totalHistorico: number,
    porElemento: IPackMensajeriaPorElemento,
  };
  sms: {
    totalHistorico: number,
    porElemento: IPackMensajeriaPorElemento,
  };
  whatsapp: {
    totalHistorico: number,
    porElemento: IPackMensajeriaPorElemento,
  };
}

interface IPackMensajeriaPorElemento {
  disponible: number;
  totalHistorico: number;
  utilizadoHistorico: number;
}

// Recordatorios manuales para cliente
interface IRecordatorioManualParaCliente {
  habilitado: boolean;
  tipoMedio: TMensajeriaMedioTipo | 'todos';
}

// Los mensajes por correo ya vienen con el plan basico
export interface IConfigMensajeriaProfesional {
  id: string;
  idUsuario: string;
  idProfesional: string;
  packMensajeria: IPackMensajeria;
  recordatorioManualParaCliente: IRecordatorioManualParaCliente;
  fechaCreacion: Date;
}

export interface IConfigMensajeriaProfesionalOpcional {
  id?: string;
  idUsuario?: string;
  idProfesional?: string;
  packMensajeria?: IPackMensajeria;
  recordatorioManualParaCliente?: IRecordatorioManualParaCliente;
  fechaCreacion?: Date;
}

// packMensajeria: Explica la disponibilidad de packs de medios de comunicacion
// Verificar si tiene XXX pack-correos
// Verificar si tiene YYY pack-sms
// Verificar si tiene ZZZ pack-whatsapp
