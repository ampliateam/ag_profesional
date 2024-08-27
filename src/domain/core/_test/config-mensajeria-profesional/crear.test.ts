import { conexionConMongoDB } from '@global/connections/mongodb.connection';
import { services } from '@domain/services';
import { envs } from '@global/configs/envs';
import { testRun } from '../config';

const describeTest = testRun.configMensajeriaProfesional.crear ? describe : describe.skip;
describeTest('CRUD - Config mensajeria pack', () => {
  const idUsuario = "123456";
  const idProfesional = '66cd19cc7afd9105182e2232';

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error('Es necesario que sea modo TEST. Ejecute [npm run test]');
    }
    
    await conexionConMongoDB();
  });

  test('crear | config-mensajeria-profesional | crud', async () => {
    // Crear un profesional
    const modelNuevo = await services.core.configMensajeriaProfesional.crud.crear({
      configMensajeriaProfesional: {
        idUsuario,
        idProfesional,
        packMensajeria: {
          correo: {
            totalHistorico: 0,
            porElemento: {
              disponible: 0,
              totalHistorico: 0,
              utilizadoHistorico: 0,
            },
          },
          sms: {
            totalHistorico: 0,
            porElemento: {
              disponible: 0,
              totalHistorico: 0,
              utilizadoHistorico: 0,
            },
          },
          whatsapp: {
            totalHistorico: 0,
            porElemento: {
              disponible: 0,
              totalHistorico: 0,
              utilizadoHistorico: 0,
            },
          },
        },
        recordatorioManualParaCliente: {
          habilitado: false,
          tipoMedio: 'correo',
        },
      },
    });

    expect(modelNuevo).toBeTruthy();
  });
});
