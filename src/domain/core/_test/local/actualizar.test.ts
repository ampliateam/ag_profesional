import { envs } from "@global/configs/envs";
import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";
import { testRun } from "../config";

const describeTest = testRun.local.actualizar ? describe : describe.skip;
describeTest("CRUD", () => {
  const ids = [
    '66e901676f02a8a44a13a428',
    '66e901d0e9ca1170cabb4aef',
    '66e9035c7e446aa38d74331f',
  ];

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error("Es necesario que sea modo TEST. Ejecute [npm run test]");
    }

    await conexionConMongoDB();
  });

  test("actualizar | local | crud", async () => {
    const descripcionActualizado = 'Local genial de la esquina.';

    // Obtener local por id
    const local = await services.core.local.crud.actualizar({
      buscarPor: { _id: ids[0] },
      actualizado: { descripcion: descripcionActualizado },
    });
    
    // Verificaciones
    expect(local).toBeTruthy();
    expect(descripcionActualizado).toEqual(local.descripcion);
  });
  
  test("actualizar | local | db-0", async () => {
    const descripcionActualizado = 'Local no tan genial de la otra esquina.';

    // Obtener local por id
    const [local] = await services.core.local.db.actualizar(
      { _id: ids[1] },
      { descripcion: descripcionActualizado }
    );
    
    // Verificaciones
    expect(local).toBeTruthy();
    expect(descripcionActualizado).toEqual(local.descripcion);
  });
  
  test("actualizar | local | db-1", async () => {
    const descripcionActualizado = 'El local uwu.';

    // Obtener local por id
    const local = await services.core.local.db.actualizarPorID(
      { _id: ids[2] },
      { descripcion: descripcionActualizado }
    );

    // Verificaciones
    expect(local).toBeTruthy();
    expect(descripcionActualizado).toEqual(local.descripcion);
  });
});
