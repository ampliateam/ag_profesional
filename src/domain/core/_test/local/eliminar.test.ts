import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.local.eliminar ? describe : describe.skip;
describeTest("CRUD", () => {
  const ids = [
    '66e901676f02a8a44a13a428',
    '66e901d0e9ca1170cabb4aef',
    '66e9035c7e446aa38d74331f',
  ];

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error('Es necesario que sea modo TEST. Ejecute [npm run test]');
    }

    await conexionConMongoDB();
  });

  test("eliminar-logicamente | local", async () => {
    const _id = ids[2];
    
    // Eliminar
    const eliminado =
      await services.core.local.eliminarLogicamente({
        buscarPor: { _id },
        fechaEliminacion: new Date(),
      });

    expect(ids).toContain(eliminado._id);
    expect(_id).toEqual(eliminado._id);
    expect(eliminado.estado).toEqual("eliminado");
  });
});
