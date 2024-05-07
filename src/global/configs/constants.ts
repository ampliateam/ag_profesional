import { envs } from "./envs";

const constantes = {
    codigoServicioPrincipal: 'ag_profesional',
    nombreStore: {
        configMensajeriaProfesional: 'ConfigMensajeriaProfesional',
        parametroSistema: 'ParametrosSistema',
        profesional: 'Profesionales',
        servicioProfesional: 'ServiciosProfesionales',
    },
    parametroBusqueda: {
        baseUrlAgCliente: 'base_url_ag_cliente',
        baseUrlAgProfesional: 'base_url_ag_profesional',
        baseUrlAgUsuario: 'base_url_ag_usuario',
    }
};

if (envs.modoTest) {
    constantes.nombreStore.configMensajeriaProfesional += '_test';
    constantes.nombreStore.parametroSistema += '_test';
    constantes.nombreStore.profesional += '_test';
    constantes.nombreStore.servicioProfesional += '_test';
}

export const constants = constantes;
