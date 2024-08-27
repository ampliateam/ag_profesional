import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.servicioProfesional.obtener ? describe : describe.skip;
describeTest("Obtener servicio profesional", () => {
  const ids = [
    '66cd26066e9ef9d474d6e430',
    '66cd26477759ba884b96cd8f',
    '66cd265f0fb6648d4dc82b02'
  ];
  const filter = {
    idProfesional: '66cd19426e872951ab59711f',
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
