import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.servicioProfesional.eliminar ? describe : describe.skip;
describeTest("CRUD - Servicio profesional", () => {
  const ids = [
    '66cd26066e9ef9d474d6e430',
    '66cd26477759ba884b96cd8f',
    '66cd265f0fb6648d4dc82b02'
  ];
  const filter = {
    idProfesional: '66cd19426e872951ab59711f',
    nombreServicio: 'Servicio3',
  };

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test("eliminar | servicio-profesional | por _id", async () => {
    const _id = ids[1];

    // Obtenemos el servicio de un profesional
    const servicioProfesional =
      await services.core.servicioProfesional.eliminarLogicamente({
        buscarPor: { _id },
        fechaEliminacion: new Date(),
      });

      expect(_id).toEqual(servicioProfesional._id);
      expect('eliminado').toEqual(servicioProfesional.estado);
  });

  test("eliminar | servicio-profesional | por busqueda compuesta", async () => {
    // Obtenemos el servicio de un profesional
    const servicioProfesional =
      await services.core.servicioProfesional.eliminarLogicamente({
        buscarPor: {
          nombreServicioPorProfesional: {
            idProfesional: filter.idProfesional,
            nombreServicio: filter.nombreServicio,
            estado: 'habilitado'
          },
        },
        fechaEliminacion: new Date(),
      });

      expect(ids).toContain(servicioProfesional._id);
      expect('eliminado').toEqual(servicioProfesional.estado);
  });

});
