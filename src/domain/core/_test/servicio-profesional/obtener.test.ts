import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.servicioProfesional.obtener ? describe : describe.skip;
describeTest("Obtener servicio profesional", () => {
  const ids = [
    '66cf689b5b0836c9a3f48398',
    '66cf68ae61a7db5c9145c142',
    '66cf760202fb02f5cbe85ddf',
  ];
  const filter = {
    idProfesional: '66cf5d3b551893628cf7c944',
    nombreServicio: 'Servicio1',
  };

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test("obtener | servicio-profesional | crud", async () => {
    // Obtenemos el servicio de un profesional
    const servicioProfesional =
      await services.core.servicioProfesional.crud.obtener({
        nombreServicioPorProfesional: {
          idProfesional: filter.idProfesional,
          nombreServicio: filter.nombreServicio,
          estado: 'habilitado'
        },
      });

    expect(ids).toContain(servicioProfesional._id);
  });

  test("crear | servicio-profesional | db-0", async () => {
    const _id = ids[0];

    // Obtenemos el servicio de un profesional
    const [servicioProfesional] =
      await services.core.servicioProfesional.db.obtener({ _id });

    expect(_id).toEqual(servicioProfesional._id);
  });
});
