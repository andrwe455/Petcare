const appointmentSchema = require ('../schemas/appointmentSchema')

async function crtappointment(req, res) {
    try {
        const normalizeName = (name) => {
            return name
                .normalize("NFD") 
                .replace(/[\u0300-\u036f]/g, "") 
                .replace(/\s+/g, "") 
                .toLowerCase(); 
        };

        let veterinarian = req.body.veterinarian;
        if (!veterinarian || typeof veterinarian !== 'string' || veterinarian.trim() === '') {
            return res.status(400).json({ success: false, message: 'Veterinarian name is required.' });
        }
        veterinarian = normalizeName(veterinarian);

        const newDateStr = req.body.date; 
        const [month, day, yearAndTime] = newDateStr.split('/');
        const [year, time] = yearAndTime.split(' ');
        const [hours, minutes] = time.split(':');

        const newDate = new Date(year, month - 1, day, hours, minutes, 0);

        if (isNaN(newDate.getTime()) || (newDate.getMinutes() % 30 !== 0)) {
            return res.status(400).json({ success: false, message: 'Please select a 30 minutes interval to make an appointment.' });
        }

        const startOfAppointment = new Date(newDate.setSeconds(0, 0));
        const endOfAppointment = new Date(newDate.getTime() + 30 * 60000);

        const conflictingAppointment = await appointmentSchema.findOne({
            veterinarian: { $regex: new RegExp(`^${veterinarian}$`, 'i') }, 
            date: {
                $gte: startOfAppointment,
                $lt: endOfAppointment
            }
        });

        if (conflictingAppointment) {
            return res.status(400).json({
                success: false,
                message: 'This veterinarian already has an appointment scheduled at this time.'
            });
        }

        const newAppointment = new appointmentSchema(req.body);
        newAppointment.veterinarian = veterinarian;
        newAppointment.date = startOfAppointment; 
        await newAppointment.save();

        res.status(201).json({ success: true, message: 'Appointment created successfully' });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'This veterinarian already has an appointment scheduled at this time.' });
        }
        console.error('Error creating appointment:', error);
        res.status(500).json({ success: false, message: 'There was an error creating the appointment' });
    }
}


async function updateappointment(req, res) {
    try {
        const normalizeName = (name) => {
            return name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "")
                .toLowerCase();
        };

        let veterinarian = req.body.veterinarian;
        if (!veterinarian || typeof veterinarian !== 'string' || veterinarian.trim() === '') {
            return res.status(400).json({ success: false, message: 'Veterinarian name is required.' });
        }
        veterinarian = normalizeName(veterinarian);

        const newDateStr = req.body.date;
        const [month, day, yearAndTime] = newDateStr.split('/');
        const [year, time] = yearAndTime.split(' ');
        const [hours, minutes] = time.split(':');

        const newDate = new Date(year, month - 1, day, hours, minutes, 0);

        if (isNaN(newDate.getTime()) || (newDate.getMinutes() % 30 !== 0)) {
            return res.status(400).json({ success: false, message: 'Invalid date format or not a 30-minute interval. Please use MM/DD/YYYY HH:MM.' });
        }

        const startOfAppointment = new Date(newDate.setSeconds(0, 0));
        const endOfAppointment = new Date(newDate.getTime() + 30 * 60000);

        const conflictingAppointment = await appointmentSchema.findOne({
            _id: { $ne: req.body.id },
            veterinarian: { $regex: new RegExp(`^${veterinarian}$`, 'i') },
            date: {
                $gte: startOfAppointment,
                $lt: endOfAppointment
            }
        });

        if (conflictingAppointment) {
            return res.status(400).json({ success: false, message: 'This time slot is already booked. Please choose another time.' });
        }

        const updatedAppointment = await appointmentSchema.findByIdAndUpdate(
            req.body.id,
            { date: startOfAppointment, veterinarian: veterinarian },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment updated successfully', data: updatedAppointment });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'There was an error updating the appointment.' });
    }
}


async function deleteappointment(req, res) {
    try {

        let veterinarian = req.body.veterinarian;

        const newDateStr = req.body.date;
        const [month, day, yearAndTime] = newDateStr.split('/');
        const [year, time] = yearAndTime.split(' ');
        const [hours, minutes] = time.split(':');

        const newDate = new Date(year, month - 1, day, hours, minutes, 0);

        const startOfAppointment = new Date(newDate.setSeconds(0, 0));
        const endOfAppointment = new Date(newDate.getTime() + 30 * 60000);

        const deletedAppointment = await appointmentSchema.deleteOne({
            _id: req.body.id ,
            veterinarian: { $regex: new RegExp(`^${veterinarian}$`, 'i') },
            date: {
                $gte: startOfAppointment,
                $lt: endOfAppointment
            }
        });

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'There was an error deleting the appointment.' });
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
    deleteappointment,
    getappointment
}