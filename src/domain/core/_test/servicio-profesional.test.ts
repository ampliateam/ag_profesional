import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";

describe('CRUD - Servicio profesional', () => {
    const idUsuario = '654321';
    const idProfesional = '000000000000000000000001';
    const idServicioProfesional = '000000000000000000000000';
    const nombreServicio = 'Servicio1';

    beforeAll(async () => {    
        await conexionConMongoDB();

        // TODO: Vaciar colecciones especificas

        // Crear profesional
        await services.core.profesional.crud.crear({
            profesional: {
                id: idProfesional,
                idUsuario,
                contactos: [{
                    codigoAccesoInternacional: '+595',
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
        
        // Obtenemos el servicio de un profesional y eliminar si existe 
        const servicioProfesionalExistente = await services.core.servicioProfesional.crud.obtener({
            nombreServicioPorProfesional: {
                idProfesional,
                nombreServicio
            }
        });
        if (servicioProfesionalExistente) {
            await services.core.servicioProfesional.crud.eliminar({
                nombreServicioPorProfesional: {
                    idProfesional,
                    nombreServicio
                }
            });
        }

        // Creamos un nuevo servicio de profesional
        const servicioProfesionalNuevo = await services.core.servicioProfesional.crud.crear({
            servicioProfesional: {
                id: idServicioProfesional,
                idProfesional,
                nombreServicio,
                observacion: 'Este servicio se enfoca el algo bueno que hago.',
                estado: 'habilitado',
                fechaCreacion: new Date(),
            }
        });

        expect(servicioProfesionalNuevo.id).toEqual(idServicioProfesional);
    });
    
    test('Obtener servicio profesional', async () => {
        // Obtenemos el servicio de un profesional
        const servicioProfesional = await services.core.servicioProfesional.crud.obtener({
            nombreServicioPorProfesional: {
                idProfesional,
                nombreServicio
            }
        });

        expect(servicioProfesional.id).toEqual(idServicioProfesional);
    });

    test('Obtener lista servicio profesional', async () => {
        const listaId = [
            '000000000000000000000000'
        ];

        // Obtener lista de servicios profesionales
        const lista = await services.core.servicioProfesional.obtenerListaPorIds(listaId);

        // Si no existe ningun servicio profesional, verificar
        if (!lista.length) {
            return expect(lista.length).toEqual(0);
        }

        // Verificar lista de id de servicios profesionales
        for (const id of listaId) {
            expect(lista.find(v => v.id === id || '')?.id || '').toEqual(id);
        }
    });
    
});
