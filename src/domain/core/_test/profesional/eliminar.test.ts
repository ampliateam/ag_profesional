import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.profesional.eliminar ? describe : describe.skip;
describeTest("CRUD - Profesional", () => {
  const ids = [
    '66cd19426e872951ab59711f',
    '66cd19b355327e5ef7b9d377',
    '66cd19cc7afd9105182e2232',
  ];

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error('Es necesario que sea modo TEST. Ejecute [npm run test]');
    }

    await conexionConMongoDB();
  });

  test("eliminar-logicamente | profesional", async () => {
    // Eliminar
    const profesionalEliminado =
      await services.core.profesional.eliminarLogicamente({
        buscarPor: { _id: ids[1] },
        fechaEliminacion: new Date(),
      });

    expect(ids).toContain(profesionalEliminado._id);
    expect(profesionalEliminado.estado).toEqual("eliminado");
  });
});
