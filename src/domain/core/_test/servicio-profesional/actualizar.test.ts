import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.servicioProfesional.actualizar ? describe : describe.skip;
describeTest("CRUD - Servicio profesional", () => {
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

  test("actualizar | servicio-profesional | crud", async () => {
    const observacion = 'Este servicio se enfoca el algo bueno que hago. (Actualizado x2)';

    // Obtenemos el servicio de un profesional
    const servicioProfesional =
      await services.core.servicioProfesional.crud.actualizar({
        buscarPor: {
          nombreServicioPorProfesional: {
            idProfesional: filter.idProfesional,
            nombreServicio: filter.nombreServicio,
            estado: 'habilitado'
          },
        },
        actualizado: { observacion }
      });

    expect(ids).toContain(servicioProfesional._id);
    expect(observacion).toEqual(servicioProfesional.observacion);
  });

  test("actualizar | servicio-profesional | db-0", async () => {
    const _id = ids[1];
    const observacion = 'Este servicio se enfoca el algo bueno que hago. (Actualizado x2)';

    // Obtenemos el servicio de un profesional
    const [servicioProfesional] =
      await services.core.servicioProfesional.db.actualizar(
        { _id },
        { observacion }
      );

    expect(ids).toContain(servicioProfesional._id);
    expect(observacion).toEqual(servicioProfesional.observacion);
  });
});
