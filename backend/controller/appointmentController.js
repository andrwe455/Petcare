const appointmentSchema = require ('../schemas/appointmentSchema')

async function crtappointment(req, res) {
    try {
        const newDate = new Date(req.body.date);
        const existingAppointment = await appointmentSchema.findOne({ date: newDate });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Appointment time already used' });
        }

        req.body.date = newDate;

        const newAppointment = new appointmentSchema(req.body);
        await newAppointment.save();

        res.status(201).json({ message: 'Successful appointment' });

    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'There was an error creating the appointment' });
    }
}

async function updateappointment(req, res) {
    try {
        const newDate = new Date(req.body.date);

        const existingAppointment = await appointmentSchema.findOne({
            date: newDate
        });

        if (existingAppointment && existingAppointment._id.toString() !== req.body.id) {
            return res.status(400).json({ message: 'This time slot is already booked. Please choose another time.' });
        }
        const updatedAppointment = await appointmentSchema.findByIdAndUpdate(req.body.id, { date: newDate }, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment updated successfully', data: updatedAppointment });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'There was an error updating the appointment.' });
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