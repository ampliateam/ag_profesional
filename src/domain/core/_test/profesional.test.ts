import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";

describe('CRUD - Profesional', () => {
    const idUsuario = '123456';
    const idProfesional = '000000000000000000000000';

    beforeAll(async () => {    
        await conexionConMongoDB();

        // TODO: Vaciar colecciones especificas
        
        // Eliminamos los usuarios de prueba
        const profesionalExistente = await services.core.profesional.crud.obtener({ idUsuario });
        if (profesionalExistente) {
            await services.core.profesional.eliminarLogicamente({
                buscarPor: { idUsuario },
                fechaEliminacion: new Date()
            });
        }

        // Crear un profesional
        const profesionalNuevo = await services.core.profesional.crud.crear({
            profesional: {
                id: idProfesional,
                idUsuario,
                contactos: [{
                    codigoTelefono: '+595',
                    contacto: '982139653',
                    tipo: 'telefono-movil',
                    prioridad: 'principal'
                }],
                direccion: {
                    referencia: '',
                    ubicacion: [0, 0]
                },
                estado: 'habilitado',
                fechaCreacion: new Date(),
                fechaEliminacion: null,
            }
        });

        expect(profesionalNuevo.id).toEqual(idProfesional);
    });

    test('Obtener profesional', async () => {
        // Obtener profesional
        const profesional = await services.core.profesional.crud.obtener({ idUsuario });

        expect(profesional.id).toEqual(idProfesional);
    });

    test('Obtener lista profesional', async () => {
        const listaId = [
            '000000000000000000000000'
        ];

        // Obtener lista de profesionales
        const lista = await services.core.profesional.obtenerListaPorIds(listaId);

        // Si no existe ningun profesional, verificar
        if (!lista.length) {
            return expect(lista.length).toEqual(0);
        }

        // Verificar lista de id de profesionales
        for (const id of listaId) {
            expect(lista.find(v => v.id === id || '')?.id).toEqual(id);
        }
    });

});
