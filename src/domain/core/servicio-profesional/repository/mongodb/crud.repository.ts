import { IServicioProfesional } from "@global/models/ag_profesional";
import { ActualizarServicioProfesionalDTO, BuscarServicioProfesionalDTO, CrearServicioProfesionalDTO } from "../../dto";
import { ServicioProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToServicioProfesional } from "@domain/_helpers";
import { manejadorDeErrorMongodb } from "@domain/_errors";

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

export const crear = async (dto: CrearServicioProfesionalDTO): Promise<IServicioProfesional> => {
    try {
        const modelMongoDB = await ServicioProfesionalModel.create(dto.servicioProfesional);
        return await obtener({ _id: modelMongoDB._id.toString() });
    } catch (error) {
        return manejadorDeError(error);
    }
}

export const obtener = async (dto: BuscarServicioProfesionalDTO): Promise<IServicioProfesional> => {
    try {
        // Proceso de filtracion
        const filtros:any = {};
        if (dto._id) {
            filtros._id = dto._id;
        } else if (dto.nombreServicioPorProfesional) {
            filtros.idProfesional = dto.nombreServicioPorProfesional.idProfesional;
            filtros.nombreServicio = dto.nombreServicioPorProfesional.nombreServicio;
        } else return null;

        // Obtener todos los servicios profesionales que tengan estado "habilitado" O "deshabilitado"
        filtros['$or'] = [
            { estado: 'habilitado' },
            { estado: 'deshabilitado' },
        ];

        const modelMongoDB = await ServicioProfesionalModel.findOne(filtros);
        if (!modelMongoDB) return null;
        return mongoToServicioProfesional(modelMongoDB);
    } catch (error) {
        return manejadorDeError(error);
    }
}

export const actualizar = async (dto: ActualizarServicioProfesionalDTO): Promise<IServicioProfesional> => {
    try {
        const servicioProfesional: IServicioProfesional = await obtener(dto.buscarPor);
        if (!servicioProfesional) return null;

        await ServicioProfesionalModel.updateOne({
            _id: servicioProfesional._id
        }, dto.actualizado);

        return Object.assign(servicioProfesional, dto.actualizado);
    } catch (error) {
        return manejadorDeError(error);
    }
}
