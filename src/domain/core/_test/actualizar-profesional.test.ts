import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";

describe.skip("Actualizar Profesional", () => {
  const idsProfesional = [
    "bf23636a6a33e79da32c081b",
  ];

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test("Actualizar profesional - 0", async () => {
    // Obtener profesional por idUsuario
    const profesionales = await services.core.profesional.db.actualizar(
      { _id: idsProfesional[0] },
      { etiqueta: "entrenamiento" }
    );
    console.log("Profesionales actualizados:", profesionales);

    // Verificaciones
    expect(profesionales.length).toBeTruthy();
  });

  test.skip("Actualizar profesional - 1", async () => {
    // Obtener profesional por idUsuario
    const profesional = await services.core.profesional.crud.actualizar({
      buscarPor: { _id: idsProfesional[1] },
      actualizado: { etiqueta: "nutricion" },
    });
    console.log("Profesional actualizado:", profesional);

    // Verificaciones
    expect(profesional).toBeTruthy();
  });

  test.skip("Actualizar profesional - 2", async () => {
    // Obtener profesional por idUsuario
    const profesional = await services.core.profesional.db.actualizarPorID(
      { _id: idsProfesional[2] },
      { etiqueta: "otro" }
    );
    console.log("Profesional actualizado:", profesional);

    // Verificaciones
    expect(profesional).toBeTruthy();
  });
});
