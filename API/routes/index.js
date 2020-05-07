const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

module.exports = function(){

    //Agrega nuevos pacientes via POST
    router.post('/pacientes', pacienteController.nuevoCliente);

    //Obtiene todos los registros de pacientes de la DB
    router.get('/pacientes', pacienteController.obtenerPacientes);

    //Obtiene un pociente en especifico (ID)
    router.get('/pacientes/:id', pacienteController.obtenerPacienteID);

    //Actualizar un registro con un ID especifico
    router.put('/pacientes/:id', pacienteController.actualizarPacienteID);

    //Eliminar un paciente por su ID
    router.delete('/pacientes/:id', pacienteController.eliminarPacienteID);

    return router;
}