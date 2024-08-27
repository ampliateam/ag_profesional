import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.profesional.actualizar ? describe : describe.skip;
describeTest("CRUD - Profesional", () => {
  const ids = [
    '66cd19426e872951ab59711f',
    '66cd19b355327e5ef7b9d377',
    '66cd19cc7afd9105182e2232',
  ];

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test.skip("actualizar | profesional | crud", async () => {
    // Obtener profesional por idUsuario
    const profesional = await services.core.profesional.crud.actualizar({
      buscarPor: { _id: ids[0] },
      actualizado: { etiqueta: 'otro' },
    });

    // Verificaciones
    expect(profesional).toBeTruthy();
  });

  test("actualizar | profesional | db-0", async () => {
    // Obtener profesional por idUsuario
    const profesionales = await services.core.profesional.db.actualizar(
      { _id: ids[1] },
      { etiqueta: "entrenamiento" }
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
