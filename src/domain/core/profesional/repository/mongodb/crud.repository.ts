import { IProfesional } from "@global/models/interfaces";
import { ActualizarProfesionalDTO, BuscarProfesionalDTO, CrearProfesionalDTO } from "../../dto";
import { ProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToProfesional } from "@domain/_helpers";

export const crear = async (dto: CrearProfesionalDTO): Promise<IProfesional> => {
    const modelMongoDB = await ProfesionalModel.create(dto.profesional);
    return await obtener({ _id: modelMongoDB._id.toString() });
};

export const obtener = async (dto: BuscarProfesionalDTO): Promise<IProfesional> => {
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
};

export const actualizar = async (dto: ActualizarProfesionalDTO): Promise<IProfesional> => {
    const profesional = await obtener(dto.buscarPor);
    if (!profesional) return null;

    await ProfesionalModel.updateOne({
        _id: profesional._id
    }, dto.actualizado);

    return Object.assign(profesional, dto.actualizado);
};
