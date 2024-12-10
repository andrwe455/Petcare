const appointmentSchema = require ('../schemas/appointmentSchema')
const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const Pet = require('../schemas/petSchema');

async function crtappointment(req, res) {
    try {
        let veterinarian = req.body.veterinarian;
        let pet = req.body.pet;

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

        const conflictingAppointmentVet = await appointmentSchema.findOne({
            veterinarian: { $regex: new RegExp(`^${veterinarian}$`, 'i') }, 
            date: {
                $gte: startOfAppointment,
                $lt: endOfAppointment
            }
        });

        if (conflictingAppointmentVet) {
            return res.status(400).json({
                success: false,
                message: 'This veterinarian already has an appointment scheduled at this time.'
            });
        }

        const startOf24Hours = new Date(startOfAppointment.getTime() - 24 * 60 * 60 * 1000);
        const endOf24Hours = new Date(startOfAppointment.getTime() + 24 * 60 * 60 * 1000);

        const conflictingAppointmentPet = await appointmentSchema.findOne({
            _id: { $ne: req.body.id },
            pet: pet,
            date: {
                $gte: startOf24Hours,
                $lt: endOf24Hours
            }
        });

        if (conflictingAppointmentPet) {
            return res.status(400).json({
                success: false,
                message: 'This pet already has an appointment within 24 hours of the selected time.'
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

async function  updateappointment(req, res) {
    try {
        const { id, veterinarian, pet, owner, date } = req.body;

        const [month, day, yearAndTime] = date.split('/');
        const [year, time] = yearAndTime.split(' ');
        const [hours, minutes] = time.split(':');
        const newDate = new Date(year, month - 1, day, hours, minutes, 0);

        if (isNaN(newDate.getTime()) || (newDate.getMinutes() % 30 !== 0)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format or not a 30-minute interval. Please use MM/DD/YYYY HH:MM.'
            });
        }

        const startOfAppointment = new Date(newDate.setSeconds(0, 0));
        const endOfAppointment = new Date(startOfAppointment.getTime() + 30 * 60 * 1000);

        const conflictingAppointmentVet = await appointmentSchema.findOne({
            veterinarian: { $regex: new RegExp(`^${veterinarian}$`, 'i') },
            date: {
                $gte: startOfAppointment,
                $lt: endOfAppointment
            },
            _id: { $ne: id } 
        });

        if (conflictingAppointmentVet) {
            return res.status(400).json({
                success: false,
                message: 'This veterinarian already has an appointment scheduled at this time.'
            });
        }

        const startOf24Hours = new Date(startOfAppointment.getTime() - 24 * 60 * 60 * 1000);
        const endOf24Hours = new Date(startOfAppointment.getTime() + 24 * 60 * 60 * 1000);

        const conflictingAppointmentPet = await appointmentSchema.findOne({
            pet: pet,
            owner: owner,
            date: {
                $gte: startOf24Hours,
                $lt: endOf24Hours
            },
            _id: { $ne: id } 
        });

        if (conflictingAppointmentPet) {
            return res.status(400).json({
                success: false,
                message: 'This pet already has an appointment within 24 hours of the selected time.'
            });
        }

        const updatedAppointment = await appointmentSchema.findByIdAndUpdate(
            id,
            { veterinarian, pet, owner, date: startOfAppointment },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment updated successfully.',
            data: updatedAppointment
        });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({
            success: false,
            message: 'There was an error updating the appointment.'
        });
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


async function crtappointmentusers (req, res) {
    
    try {
        const role = req.query.role;
        if (!role) return res.status(400).send({ error: 'Role is required' });
        const users = await User.find({ role });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};


async function crtappointmentpets (req, res){
    try {
        const ownerId = req.query.owner;
        if (!ownerId) return res.status(400).send({ error: 'Owner ID is required' });
        const pets = await Pet.find({ owner: ownerId });
        res.json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = router;


module.exports = {
    crtappointment,
    updateappointment,
    deleteappointment,
    getappointment,
    crtappointmentusers,
    crtappointmentpets,
}