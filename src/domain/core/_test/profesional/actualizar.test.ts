import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.profesional.actualizar ? describe : describe.skip;
describeTest("CRUD - Profesional", () => {
  const ids = [
    '66e86ea0ece7cbe583318492',
    '66e86efc244f0af29e306bc8',
    '66e86fb3722a859a6ddc3fd9',
  ];

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test("actualizar | profesional | crud", async () => {
    // Obtener profesional por idUsuario
    const profesional = await services.core.profesional.crud.actualizar({
      buscarPor: { _id: ids[0] },
      actualizado: { etiqueta: 'nutricion' },
    });

    // Verificaciones
    expect(profesional).toBeTruthy();
  });

  test.skip("actualizar | profesional | db-0", async () => {
    // Obtener profesional por idUsuario
    const profesionales = await services.core.profesional.db.actualizar(
      { _id: ids[1] },
      { etiqueta: "odontologia" }
    );

    // Verificaciones
    expect(profesionales.length).toBeTruthy();
  });

  test.skip("actualizar | profesional | db-1", async () => {
    // Obtener profesional por idUsuario
    const profesional = await services.core.profesional.db.actualizarPorID(
      { _id: ids[2] },
      { etiqueta: "entrenamiento" }
    );

    // Verificaciones
    expect(profesional).toBeTruthy();
  });
});
