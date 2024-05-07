import { IConfigMensajeriaProfesional } from "@global/models/interfaces";
import { ConfigMensajeriaProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToConfigMensajeriaProfesional } from "@domain/_helpers";
import {
    ActualizarConfigMensajeriaProfesionalDTO,
    BuscarConfigMensajeriaProfesionalDTO,
    CrearConfigMensajeriaProfesionalDTO
} from "../dto";

export const crear = async (dto: CrearConfigMensajeriaProfesionalDTO): Promise<IConfigMensajeriaProfesional> => {
    const modelMongoDB = await ConfigMensajeriaProfesionalModel.create(dto.configMensajeriaProfesional);
    return await obtener({ id: modelMongoDB.id });
}

export const obtener = async (dto: BuscarConfigMensajeriaProfesionalDTO): Promise<IConfigMensajeriaProfesional> => {
    // Proceso de filtracion
    const filtros:any = {};
    if (dto.id) {
        filtros._id = dto.id;
    } else if (dto.idUsuario) {
        filtros.idUsuario = dto.idUsuario;
    } else if (dto.idProfesional) {
        filtros.idProfesional = dto.idProfesional;
    } else return null;

    const modelMongoDB = await ConfigMensajeriaProfesionalModel.findOne(filtros);
    if (!modelMongoDB) return null;
    return mongoToConfigMensajeriaProfesional(modelMongoDB);
}

export const actualizar = async (dto: ActualizarConfigMensajeriaProfesionalDTO): Promise<IConfigMensajeriaProfesional> => {
    const configMensajeriaProfesional = await obtener(dto.buscarPor);
    if (!configMensajeriaProfesional) return null;

    await ConfigMensajeriaProfesionalModel.updateOne({
        _id: configMensajeriaProfesional.id
    }, dto.actualizado);

    return Object.assign(configMensajeriaProfesional, dto.actualizado);
}
