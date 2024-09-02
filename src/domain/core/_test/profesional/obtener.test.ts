import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.profesional.obtener ? describe : describe.skip;
describeTest("CRUD - Profesional", () => {
  const idUsuario = "123456";
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

  test("obtener | profesional | crud", () => {
    // Obtener profesional
    ids.map(async v => {
      const profesional = await services.core.profesional.crud.obtener({
        _id: v
      });

      expect(profesional._id).toEqual(v);
    });
  });

  test("obtener | profesional | db-0", async () => {
    // Obtener profesional
    const profesionales = await services.core.profesional.db.obtener({
      $and: [
        { _id: ids[0] },
        { idUsuario },
      ]
    });

    expect(profesionales[0]._id).toEqual(ids[0]);

    profesionales.map(v => {
      expect(v._id).toBeTruthy();
    });
  });

  test("obtener | profesional | db-1", async () => {
    // Obtener profesional
    const profesionalesExistentes = await services.core.profesional.db.obtener({
      _id: { '$in': ids }
    });

    profesionalesExistentes.map(v => {
      expect(ids).toContain(v._id);
    });
  });

  test("obtener | profesional | db-2", () => {
    // Obtener profesional
    ids.map(async v => {
      const profesional = await services.core.profesional.db.obtenerPorID(v);

      expect(profesional._id).toEqual(v);
    });
  });

});
