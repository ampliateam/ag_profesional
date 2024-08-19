import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";

describe.skip("Eliminar - Profesional", () => {
  const idsProfesional = [
    "78bba42fb3cefdc98f8f6b3c",
    "b8594eeba2d10a96dce0c69e",
  ];

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error('Es necesario que sea modo TEST. Ejecute [npm run test]');
    }

    await conexionConMongoDB();
  });

  test("Eliminar profesional", async () => {
    // Eliminar
    idsProfesional.map(async (_id) => {
      const profesionalEliminado =
        await services.core.profesional.eliminarLogicamente({
          buscarPor: { _id },
          fechaEliminacion: new Date(),
        });

      expect(idsProfesional).toContain(profesionalEliminado._id);
      expect(profesionalEliminado.estado).toEqual("eliminado");
    });
  });
});
