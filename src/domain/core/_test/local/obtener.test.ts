import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.local.obtener ? describe : describe.skip;
describeTest("CRUD", () => {
  const idProfesional = "66e86ea0ece7cbe583318492";
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

  test("obtener | local | crud", () => {
    // Obtener profesional
    ids.map(async v => {
      const local = await services.core.local.crud.obtener({
        _id: v
      });

      expect(local._id).toEqual(v);
    });
  });

  test("obtener | local | db-0", async () => {
    // Obtener local
    const [local] = await services.core.local.db.obtener({
      $and: [
        { _id: ids[0] },
        { idProfesional },
      ]
    });

    expect(local._id).toEqual(ids[0]);
    expect(local.idProfesional).toEqual(idProfesional);
  });

  test("obtener | local | db-1", async () => {
    // Obtener local
    const localesExistentes = await services.core.local.db.obtener({
      _id: { '$in': ids }
    });

    localesExistentes.map(v => {
      expect(ids).toContain(v._id);
    });
  });

  test("obtener | local | db-2", () => {
    // Obtener local
    ids.map(async v => {
      const local = await services.core.local.db.obtenerPorID(v);

      expect(local._id).toEqual(v);
    });
  });

});
