import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.profesional.crear ? describe : describe.skip;
describeTest("CRUD - Profesional", () => {
  const idUsuario = "123456";

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test("crear | profesional | crud", async () => {
    // Crear un profesional
    const profesionalNuevo = await services.core.profesional.crud.crear({
      profesional: {
        idUsuario,
        contactos: [
          {
            codigoTelefono: "+595",
            contacto: "982139653",
            tipo: "telefono-movil",
          },
        ],
        direccion: {
          referencia: "",
          ubicacion: [0, 0],
        },
        etiqueta: 'nutricion',
        estado: "habilitado",
        fechaCreacion: new Date(),
        fechaEliminacion: null,
      },
    });

    expect(profesionalNuevo).toBeTruthy();
  });
});
