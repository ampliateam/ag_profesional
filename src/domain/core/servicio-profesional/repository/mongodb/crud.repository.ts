import { IServicioProfesional } from "@global/models/interfaces";
import { ActualizarServicioProfesionalDTO, BuscarServicioProfesionalDTO, CrearServicioProfesionalDTO } from "../../dto";
import { ServicioProfesionalModel } from "@domain/_connections/mongodb";
import { mongoToServicioProfesional } from "@domain/_helpers";

export const crear = async (dto: CrearServicioProfesionalDTO): Promise<IServicioProfesional> => {
    const modelMongoDB = await ServicioProfesionalModel.create(dto.servicioProfesional);
    return await obtener({ _id: modelMongoDB._id.toString() });
}

export const obtener = async (dto: BuscarServicioProfesionalDTO): Promise<IServicioProfesional> => {
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
}

export const actualizar = async (dto: ActualizarServicioProfesionalDTO): Promise<IServicioProfesional> => {
    const servicioProfesional: IServicioProfesional = await obtener(dto.buscarPor);
    if (!servicioProfesional) return null;

    await ServicioProfesionalModel.updateOne({
        _id: servicioProfesional._id
    }, dto.actualizado);

    return Object.assign(servicioProfesional, dto.actualizado);
}
