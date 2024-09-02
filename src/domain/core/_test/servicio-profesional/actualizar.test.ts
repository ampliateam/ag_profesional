import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.servicioProfesional.actualizar ? describe : describe.skip;
describeTest("CRUD - Servicio profesional", () => {
  const ids = [
    '66cf689b5b0836c9a3f48398',
    '66cf68ae61a7db5c9145c142',
    '66cf760202fb02f5cbe85ddf',
  ];
  const filter = {
    idProfesional: '66cf5d3b551893628cf7c944',
    nombreServicio: 'Servicio1',
    estado: 'habilitado',
  };

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test("actualizar | servicio-profesional | crud", async () => {
    const observacion = 'Este servicio se enfoca el algo bueno que hago. (Actualizado x1)';

    // Obtenemos el servicio de un profesional
    const servicioProfesional =
      await services.core.servicioProfesional.crud.actualizar({
        buscarPor: {
          nombreServicioPorProfesional: {
            idProfesional: filter.idProfesional,
            nombreServicio: filter.nombreServicio,
            estado: filter.estado as any,
          },
        },
        actualizado: { observacion }
      });

    expect(ids).toContain(servicioProfesional._id);
    expect(ids[2]).toEqual(servicioProfesional._id);
    expect(observacion).toEqual(servicioProfesional.observacion);
  });

  test("actualizar | servicio-profesional | db-0", async () => {
    const _id = ids[1];
    const observacion = 'Este servicio se enfoca el algo bueno que hago. (Actualizado x1)';

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
