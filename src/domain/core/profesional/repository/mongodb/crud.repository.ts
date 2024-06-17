import { IProfesional } from "@global/models/interfaces";
import { ActualizarProfesionalDTO, BuscarProfesionalDTO, CrearProfesionalDTO } from "../../dto";
import { ProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToProfesional } from "@domain/_helpers";

export const crear = async (dto: CrearProfesionalDTO): Promise<IProfesional> => {
    const modelMongoDB = await ProfesionalModel.create(dto.profesional);
    return await obtener({ id: modelMongoDB.id });
}

export const obtener = async (dto: BuscarProfesionalDTO): Promise<IProfesional> => {
    // Proceso de filtracion
    const filtros:any = {};
    if (dto.id) {
        filtros._id = dto.id;
    } else if (dto.idUsuario) {
        filtros.idUsuario = dto.idUsuario;
    } else return null;

    // Obtener todos los profesionales que tengan estado "habilitado" o "deshabilitado"
    filtros['$or'] = [
        { estado: 'habilitado' },
        { estado: 'deshabilitado' },
    ];

    const modelMongoDB = await ProfesionalModel.findOne(filtros);
    if (!modelMongoDB) return null;
    return mongoToProfesional(modelMongoDB);
}

export const actualizar = async (dto: ActualizarProfesionalDTO): Promise<IProfesional> => {
    const profesional: IProfesional = await obtener(dto.buscarPor);
    if (!profesional) return null;

    await ProfesionalModel.updateOne({
        _id: profesional.id
    }, dto.actualizado);

    return Object.assign(profesional, dto.actualizado);
}
