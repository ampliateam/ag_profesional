import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.profesional.eliminar ? describe : describe.skip;
describeTest("CRUD - Profesional", () => {
  const ids = [
    '66e86ea0ece7cbe583318492',
    '66e86efc244f0af29e306bc8',
    '66e86fb3722a859a6ddc3fd9',
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
