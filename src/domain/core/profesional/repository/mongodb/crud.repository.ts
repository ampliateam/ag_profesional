import { IProfesional } from "@global/models/ag_profesional";
import { ActualizarProfesionalDTO, BuscarProfesionalDTO, CrearProfesionalDTO } from "../../dto";
import { ProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToProfesional } from "@domain/_helpers";
import { manejadorDeErrorMongodb } from "@domain/_errors";

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

export const crear = async (dto: CrearProfesionalDTO): Promise<IProfesional> => {
    try {
        const modelMongoDB = await ProfesionalModel.create(dto.profesional);
        return await obtener({ _id: modelMongoDB._id.toString() });
    } catch (error) {
        return manejadorDeError(error);
    }
};

export const obtener = async (dto: BuscarProfesionalDTO): Promise<IProfesional> => {
    try {
        // Proceso de filtracion
        const filtros:any = {};
        if (dto._id) filtros._id = dto._id;
        else if (dto.idUsuario && dto.etiqueta) {
            filtros.idUsuario = dto.idUsuario;
            filtros.etiqueta = dto.etiqueta;
        } else return null;

        // Obtener todos los profesionales que tengan estado "habilitado" o "deshabilitado"
        filtros['$or'] = [
            { estado: 'habilitado' },
            { estado: 'deshabilitado' },
        ];

        const modelMongoDB = await ProfesionalModel.findOne(filtros);
        if (!modelMongoDB) return null;
        return mongoToProfesional(modelMongoDB);
    } catch (error) {
        return manejadorDeError(error);
    }
};

export const actualizar = async (dto: ActualizarProfesionalDTO): Promise<IProfesional> => {
    try {
        const profesional = await obtener(dto.buscarPor);
        if (!profesional) return null;

        await ProfesionalModel.updateOne({
            _id: profesional._id
        }, dto.actualizado);

        return Object.assign(profesional, dto.actualizado);
    } catch (error) {
        return manejadorDeError(error);
    }
};
