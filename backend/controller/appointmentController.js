const appointmentSchema = require ('../schemas/appointmentSchema')


async function crtappointment(req,res) {
    
    try{
        const newAppointment = new appointmentSchema(req.body)
        await newAppointment.save()
        res.status(201).json({message: 'Appointment created successfully'})

    }catch (error){
        res.status(500).json({message: 'Error al crear la cita'})
    }
}

async function updateappointment(req,res){

    try{
        const Appointment = await appointmentSchema.findByIdAndUpdate(req.body.id,{ date: req.body.date} )
        res.status(201).json({message: 'Appointment update successfully'})
    }
    catch(error){
        res.status(500).json({message: 'Error al actualizar la cita'})
    }
}

async function getappointment(req,res){

    try{
        const appointment = await appointmentSchema.find()
        res.status(201).json(appointment)
    }
    catch(error){
        res.json({error: 'Error getting Apointmente info'});
    }
}

module.exports = {
    crtappointment,
    updateappointment,
    getappointment
}