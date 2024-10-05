import { envs } from "./envs";

const constantes = {
    codigoServicioPrincipal: 'ag_profesional',
    nombreStore: {
        parametroSistema: 'ParametrosSistema',
        profesional: 'Profesionales',
        servicioProfesional: 'ServiciosProfesionales',
        locales: 'Locales',
    },
    parametroBusqueda: {
        baseUrlAgCliente: 'base_url_ag_cliente',
        baseUrlAgProfesional: 'base_url_ag_profesional',
        baseUrlAgUsuario: 'base_url_ag_usuario',
    }
};

if (envs.modoTest) {
    // No agregar el de `ParametrosSistema`
    constantes.nombreStore.profesional += '_test';
    constantes.nombreStore.servicioProfesional += '_test';
    constantes.nombreStore.locales += '_test';
}

export const constants = constantes;
