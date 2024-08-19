import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";

describe.skip("Obtener - Profesional", () => {
  const idUsuario = "123456";
  const idsProfesional = [
    '8ea34d4f8823222ba7568443',
    '78bba42fb3cefdc98f8f6b3c',
    'b8594eeba2d10a96dce0c69e',
  ];

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error('Es necesario que sea modo TEST. Ejecute [npm run test]');
    }

    await conexionConMongoDB();
  });

  test("Obtener profesional - 1", () => {
    // Obtener profesional
    idsProfesional.map(async v => {
      const profesional = await services.core.profesional.crud.obtener({
        _id: v
      });

      expect(profesional._id).toEqual(v);
    });
  });

  test("Obtener profesional - 2", async () => {
    // Obtener profesional
    const profesionales = await services.core.profesional.db.obtener({
      $and: [
        { _id: idsProfesional[0] },
        { idUsuario },
      ]
    });

    expect(profesionales[0]._id).toEqual(idsProfesional[0]);

    profesionales.map(v => {
      expect(v._id).toBeTruthy();
    });
  });

  test("Obtener profesional - 3", async () => {
    // Obtener profesional
    const profesionalesExistentes = await services.core.profesional.db.obtener({
      _id: { '$in': idsProfesional }
    });

    profesionalesExistentes.map((v, i) => {
      expect(v).toBeTruthy();
      expect(idsProfesional).toContain(v._id);
    });
  });

  test("Obtener profesional - 4", () => {
    // Obtener profesional
    idsProfesional.map(async v => {
      const profesional = await services.core.profesional.db.obtenerPorID(v);

      expect(profesional._id).toEqual(v);
    });
  });

});
