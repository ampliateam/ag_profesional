import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.servicioProfesional.crear ? describe : describe.skip;
describeTest("Crear Servicio profesional", () => {
  const idProfesional = '66cd19426e872951ab59711f';
  const nombreServicio = "Servicio3";

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test("crear | servicio-profesional | crud", async () => {
    // Creamos un nuevo servicio de profesional
    const servicioProfesionalNuevo =
      await services.core.servicioProfesional.crud.crear({
        servicioProfesional: {
          idProfesional,
          nombreServicio,
          observacion: "Este servicio se enfoca el algo bueno que hago.",
          estado: "habilitado",
          fechaCreacion: new Date(),
        },
      });

    expect(servicioProfesionalNuevo._id).toBeTruthy();
  });
});
