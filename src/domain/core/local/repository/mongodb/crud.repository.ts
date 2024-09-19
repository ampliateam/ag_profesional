import { ILocal } from "@global/models/interfaces";
import { ActualizarLocalDTO, BuscarLocalDTO, CrearLocalDTO } from "../../dto";
import { LocalModel } from "@domain/_connections/mongodb";
import { mongoToLocal } from "@domain/_helpers";

export const crear = async (dto: CrearLocalDTO): Promise<ILocal> => {
    const modelMongoDB = await LocalModel.create(dto.local);
    return await obtener({ _id: modelMongoDB._id.toString() });
};

export const obtener = async (dto: BuscarLocalDTO): Promise<ILocal> => {
    // Proceso de filtracion
    const filtros:any = {};
    if (dto._id) filtros._id = dto._id;
    else if (dto.idProfesional) filtros.idUsuario = dto.idProfesional;
    else return null;

    // Obtener todos los profesionales que tengan estado "habilitado" o "deshabilitado"
    filtros['$or'] = [
        { estado: 'habilitado' },
        { estado: 'deshabilitado' },
    ];

    const modelMongoDB = await LocalModel.findOne(filtros);
    if (!modelMongoDB) return null;
    return mongoToLocal(modelMongoDB);
};

export const actualizar = async (dto: ActualizarLocalDTO): Promise<ILocal> => {
    const profesional = await obtener(dto.buscarPor);
    if (!profesional) return null;

    await LocalModel.updateOne({
        _id: profesional._id
    }, dto.actualizado);

    return Object.assign(profesional, dto.actualizado);
};
