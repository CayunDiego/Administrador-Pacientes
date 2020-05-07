const PacienteModel = require('../models/PacienteModel');

//Cuando se crea un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    //Crear objeto de paciente con datos de req.body
    const paciente  = new PacienteModel(req.body);
    //TODO : Insertar en la base de datos
    try {
        await paciente.save();
        res.json({mensaje: 'El cliente se agregó correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }
}

//Obtiene todos los pacientes
exports.obtenerPacientes = async (req, res, next) => {
    try {
        const pacientes = await PacienteModel.find({});
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Obtiene un paciente en especifico por su ID
exports.obtenerPacienteID = async (req, res, next) => {
    try {
        const paciente = await PacienteModel.findById(req.params.id);
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Actualiza un registro por su ID
exports.actualizarPacienteID = async (req, res, next) => {
    try {
        const paciente = await PacienteModel.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true
        });
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Elimina un paciente por su ID
exports.eliminarPacienteID = async (req, res, next) => {
    try {
        await PacienteModel.findOneAndDelete({_id: req.params.id});
        res.json({mensaje: 'El paciente fue eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}