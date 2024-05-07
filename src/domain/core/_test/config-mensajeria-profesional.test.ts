import { conexionConMongoDB } from '@global/connections/mongodb.connection';
import { services } from '@domain/services';
import { envs } from '@global/configs/envs';

describe('CRUD - Config mensajeria pack', () => {
  const idModel = '000000000000000000000000';
  const idUsuario = '100000000000000000000000';
  const idProfesional = '100000000000000000000000';

  beforeAll(async () => {
    if (!envs.modoTest) {
      throw new Error('Es necesario que sea modo TEST. Ejecute [npm run test]');
    }
    
    await conexionConMongoDB();

    // TODO: Vaciar colecciones especificas

    // Crear un profesional
    const modelNuevo = await services.core.configMensajeriaProfesional.crud.crear({
      configMensajeriaProfesional: {
        id: idModel,
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
          }
        },
        recordatorioManualParaCliente: {
          habilitado: false,
          tipoMedio: 'correo',
        },
        fechaCreacion: undefined,
      },
    });

    expect(modelNuevo.id).toEqual(idModel);
  });

  test('Obtener config mensajeria profesional', async () => {
    // Obtener pack de mensajeria
    const model = await services.core.configMensajeriaProfesional.crud.obtener({ idUsuario });
    console.log('model', model);

    expect(model.id).toEqual(idModel);
  });

  test('Obtener lista de config mensajeria profesional', async () => {
    const listaId = ['000000000000000000000000'];

    // Obtener lista de mensajeria pack
    const lista = await services.core.configMensajeriaProfesional.obtenerListaPorIds(listaId);

    // Si no existe ningun profesional, verificar
    if (!lista.length) {
      return expect(lista.length).toEqual(0);
    }

    // Verificar lista de id de mensajeria pack
    for (const id of listaId) {
      expect(lista.find((v) => v.id === id || '')?.id).toEqual(id);
    }
  });
});
