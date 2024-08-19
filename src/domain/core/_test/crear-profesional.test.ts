import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { genRanHex } from "@domain/_helpers/generador-hexadecimal.helper";

describe.skip("Crear - Profesional", () => {
  const idUsuario = "123456";
  const idProfesional = genRanHex(24);
  console.log("idProfesional generado:", idProfesional);

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test("Crear profesional", async () => {
    // Crear un profesional
    const profesionalNuevo = await services.core.profesional.crud.crear({
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
    console.log("Profesional nuevo creado:", profesionalNuevo);

    expect(profesionalNuevo).toBeTruthy();
    expect(profesionalNuevo._id).toEqual(idProfesional);
  });
});
