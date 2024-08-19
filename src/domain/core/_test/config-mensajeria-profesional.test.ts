import { conexionConMongoDB } from '@global/connections/mongodb.connection';
import { services } from '@domain/services';
import { envs } from '@global/configs/envs';
import { genRanHex } from '@domain/_helpers/generador-hexadecimal.helper';

describe.skip('CRUD - Config mensajeria pack', () => {
  const idModel = genRanHex(24);
  const idUsuario = genRanHex(24);
  const idProfesional = genRanHex(24);

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error('Es necesario que sea modo TEST. Ejecute [npm run test]');
    }
    
    await conexionConMongoDB();

    // Crear un profesional
    const modelNuevo = await services.core.configMensajeriaProfesional.crud.crear({
      configMensajeriaProfesional: {
        _id: idModel,
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
        fechaCreacion: undefined,
      },
    });

    expect(modelNuevo._id).toEqual(idModel);
  });

  test('Obtener config mensajeria profesional', async () => {
    // Obtener pack de mensajeria
    const model = await services.core.configMensajeriaProfesional.crud.obtener({ idUsuario });

    expect(model._id).toEqual(idModel);
  });
});
