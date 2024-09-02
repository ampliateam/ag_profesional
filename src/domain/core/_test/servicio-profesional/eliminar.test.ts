import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.servicioProfesional.eliminar ? describe : describe.skip;
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
            estado: filter.estado as any,
          },
        },
        fechaEliminacion: new Date(),
      });

      expect(ids).toContain(servicioProfesional._id);
      expect(ids[2]).toEqual(servicioProfesional._id);
      expect('eliminado').toEqual(servicioProfesional.estado);
  });

});
