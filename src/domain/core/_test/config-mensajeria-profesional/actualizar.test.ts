import { conexionConMongoDB } from '@global/connections/mongodb.connection';
import { services } from '@domain/services';
import { envs } from '@global/configs/envs';
import { testRun } from '../config';

const describeTest = testRun.configMensajeriaProfesional.actualizar ? describe : describe.skip;
describeTest('CRUD - Config mensajeria pack', () => {
  const ids = [
    '66cd1fb333ba3439c69a672b',
    '66cd1ff8ffb05f14729e1116',
    '66cd200f29f4f4194dd30aa8',
  ];

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error('Es necesario que sea modo TEST. Ejecute [npm run test]');
    }
    
    await conexionConMongoDB();
  });

  test('actualizar | config-mensajeria-profesional | crud', async () => {
    const _id = ids[1];
    
    // Obtener pack de mensajeria
    const model = await services.core.configMensajeriaProfesional.crud.actualizar({
      buscarPor: { _id },
      actualizado: {
        recordatorioManualParaCliente: {
          habilitado: false,
          tipoMedio: 'todos'
        }
      }
    });

    expect(model._id).toEqual(_id);
  });

  test.skip('actualizar | config-mensajeria-profesional | db-0', async () => {
    const _id = ids[1];

    // Obtener pack de mensajeria
    const [model] = await services.core.configMensajeriaProfesional.db.actualizar(
      { _id: _id },
      {
        $set: {
          'recordatorioManualParaCliente.habilitado': true
        }
      }
    );

    expect(model._id).toEqual(_id);
  });
});
