import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.profesional.eliminar ? describe : describe.skip;
describeTest("CRUD - Profesional", () => {
  const ids = [
    '66cf5c6365ce0e28dbb2bbe3',
    '66cf5d3b551893628cf7c944',
    '66cf5e22b731b5cf995445b7',
  ];

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error('Es necesario que sea modo TEST. Ejecute [npm run test]');
    }

    await conexionConMongoDB();
  });

  test("eliminar-logicamente | profesional", async () => {
    const _id = ids[2];
    
    // Eliminar
    const profesionalEliminado =
      await services.core.profesional.eliminarLogicamente({
        buscarPor: { _id },
        fechaEliminacion: new Date(),
      });

    expect(ids).toContain(profesionalEliminado._id);
    expect(profesionalEliminado.estado).toEqual("eliminado");
  });
});
