const Diagnosis = require ('../schemas/diagnosticSchema');

async function crtDiagnostic(req, res) {
    try {
        const {
            owner,
            pet,
            assigner,
            diagnostic_name,
            symptoms_description, 
            tests_required,
            treatment_plan,
            initial_date,
            final_date,
            recommendations
        } = req.body;

        const newDiagnosis = new Diagnosis({
            owner,
            pet,
            assigner,
            diagnostic_name,
            symptoms_description, 
            tests_required: tests_required || [], 
            treatment_plan,
            initial_date,
            final_date,
            recommendations: recommendations || null 
        });

        const savedDiagnosis = await newDiagnosis.save();
        res.status(201).json({ success: true, message: 'Diagnosis created successfully.', data: savedDiagnosis });
    } catch (error) {
        console.error('Error creating diagnosis:', error);
        res.status(500).json({ success: false, message: 'Error creating diagnosis:', error: error.message });
    }
}

async function getDiagnostic(req, res) {
    try {
        const diagnoses = await Diagnosis.find();
        res.status(200).json(diagnoses);
    } catch (error) {
        console.error('Error getting diagnostics', error);
        res.status(500).json({ success: false, message: 'Error getting diagnostics' });
    }
}

module.exports = {
    crtDiagnostic,
    getDiagnostic
}; 