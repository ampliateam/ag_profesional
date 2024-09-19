import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.local.crear ? describe : describe.skip;
describeTest("CRUD - local", () => {
  const idProfesional = "66e86ea0ece7cbe583318492";

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test("crear | local | crud", async () => {
    // Crear un local
    const nuevo = await services.core.local.crud.crear({
      local: {
        idProfesional,
        nombre: 'Local3',
        descripcion: 'El local uwu.',
        direccion: { referencia: 'Ese lugar', ubicacion: [0,0] },
        contactos: [{ codigoTelefono: '+595', contacto: '0982111111', tipo: 'telefono-movil' }],
        estado: 'habilitado',
        fechaCreacion: new Date(),
        fechaEliminacion: null,
      },
    });

    expect(nuevo).toBeTruthy();
  });
});
