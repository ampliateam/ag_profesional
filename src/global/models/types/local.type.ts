export type TLocalContactoTipo = 'telefono-movil' | 'telefono' | 'correo';

export type TLocalEstado = 'habilitado' | 'deshabilitado' | 'eliminado';

export type TLocalDireccion = {
  referencia: string;
  ubicacion: [number, number] | null;
};

export type TLocalContacto = {
  codigoTelefono: string | null;
  contacto: string;
  tipo: TLocalContactoTipo;
};
