import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { genRanHex } from "@domain/_helpers/generador-hexadecimal.helper";

describe.skip("CRUD - Servicio profesional", () => {
  const idUsuario = "123456";
  const idProfesional = genRanHex(24);
  const idServicioProfesional = genRanHex(24);
  const nombreServicio = "Servicio1";

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();

    // Crear profesional
    await services.core.profesional.crud.crear({
      profesional: {
        _id: idProfesional,
        idUsuario,
        contactos: [
          {
            codigoTelefono: "+595",
            contacto: "982139653",
            tipo: "telefono-movil",
            prioridad: "principal",
          },
        ],
        direccion: {
          referencia: "",
          ubicacion: [0, 0],
        },
        etiqueta: "odontologia",
        estado: "habilitado",
        fechaCreacion: new Date(),
        fechaEliminacion: null,
      },
    });

    // Obtenemos el servicio de un profesional y eliminar si existe
    const servicioProfesionalExistente =
      await services.core.servicioProfesional.crud.obtener({
        nombreServicioPorProfesional: {
          idProfesional,
          nombreServicio,
        },
      });
    if (servicioProfesionalExistente) {
      await services.core.servicioProfesional.crud.eliminar({
        nombreServicioPorProfesional: {
          idProfesional,
          nombreServicio,
        },
      });
    }

    // Creamos un nuevo servicio de profesional
    const servicioProfesionalNuevo =
      await services.core.servicioProfesional.crud.crear({
        servicioProfesional: {
          _id: idServicioProfesional,
          idProfesional,
          nombreServicio,
          observacion: "Este servicio se enfoca el algo bueno que hago.",
          estado: "habilitado",
          fechaCreacion: new Date(),
        },
      });

    expect(servicioProfesionalNuevo._id).toEqual(idServicioProfesional);
  });

  test("Obtener servicio profesional", async () => {
    // Obtenemos el servicio de un profesional
    const servicioProfesional =
      await services.core.servicioProfesional.crud.obtener({
        nombreServicioPorProfesional: {
          idProfesional,
          nombreServicio,
        },
      });

    expect(servicioProfesional._id).toEqual(idServicioProfesional);
  });
});
