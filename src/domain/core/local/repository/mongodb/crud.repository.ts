import { ILocal } from "@global/models/ag_profesional";
import { ActualizarLocalDTO, BuscarLocalDTO, CrearLocalDTO } from "../../dto";
import { LocalModel } from "@domain/_connections/mongodb";
import { mongoToLocal } from "@domain/_helpers";
import { manejadorDeErrorMongodb } from "@domain/_errors";

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

export const crear = async (dto: CrearLocalDTO): Promise<ILocal> => {
  try {
    const modelMongoDB = await LocalModel.create(dto.local);
    return await obtener({ _id: modelMongoDB._id.toString() });
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const obtener = async (dto: BuscarLocalDTO): Promise<ILocal> => {
    try {
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
    } catch (error) {
        return manejadorDeError(error);
    }
};

export const actualizar = async (dto: ActualizarLocalDTO): Promise<ILocal> => {
    try {
        const profesional = await obtener(dto.buscarPor);
        if (!profesional) return null;

        await LocalModel.updateOne({
            _id: profesional._id
        }, dto.actualizado);

        return Object.assign(profesional, dto.actualizado);
    } catch (error) {
        return manejadorDeError(error);
    }
};
