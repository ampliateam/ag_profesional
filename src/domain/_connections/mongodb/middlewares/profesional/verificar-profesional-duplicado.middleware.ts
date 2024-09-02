export async function verificarProfesionalDuplicadoCreacion(ctx: any) {
  // Verificar si el cliente es un cliente duplicado por [idUsuario, idProfesional, estado]
  const model = ctx.model();
  let msgError = '';

  const exists = await model.findOne({
    _id: { $ne: ctx._id }, // Excluir el documento actual en caso de actualización
    idUsuario: ctx.idUsuario,
    etiqueta: ctx.etiqueta,
    estado: { $in: ['habilitado', 'deshabilitado'] },
  });

  if (!exists) return;

  msgError = 'Ya existe un documento con el mismo idUsuario, etiqueta y estado.';
  throw new Error(msgError);
};
