const supabase = require('../models/supabaseClient');

async function logBreedingEvent(req, res) {
    const { cow_id, stage, date, success, insemination_date } = req.body;

    let early_edd = null, normal_edd = null, late_edd = null, steaming_date = null, drying_date = null;
    if (stage === 'heat' && success && insemination_date) {
        const insemDate = new Date(insemination_date);
        early_edd = new Date(insemDate);
        early_edd.setDate(insemDate.getDate() + 273);
        normal_edd = new Date(insemDate);
        normal_edd.setDate(insemDate.getDate() + 280);
        late_edd = new Date(insemDate);
        late_edd.setDate(insemDate.getDate() + 287);
        drying_date = new Date(normal_edd);
        drying_date.setDate(normal_edd.getDate() - 60);
        steaming_date = new Date(normal_edd);
        steaming_date.setDate(normal_edd.getDate() - 45);
    }

    const eventData = {
        cow_id,
        stage,
        date,
        success,
        insemination_date,
        early_edd: early_edd ? early_edd.toISOString().split('T')[0] : null,
        normal_edd: normal_edd ? normal_edd.toISOString().split('T')[0] : null,
        late_edd: late_edd ? late_edd.toISOString().split('T')[0] : null,
        steaming_date: steaming_date ? steaming_date.toISOString().split('T')[0] : null,
        drying_date: drying_date ? drying_date.toISOString().split('T')[0] : null
    };

    try {
        const { data, error } = await supabase
            .from('breeding_events')
            .insert([eventData])
            .select();
        if (error) {
            console.error('Supabase insert error:', error);
            throw new Error(error.message || 'Insert failed');
        }
        res.status(201).json({ message: 'Breeding event logged', data });
    } catch (error) {
        console.error('Caught error:', error);
        res.status(500).json({ error: error.message || 'Unknown error' });
    }
}

async function getBreedingEvents(req, res) {
    try {
        const { data, error } = await supabase
            .from('breeding_events')
            .select('*, cows(tag)');
        if (error) throw new Error(error.message || 'Fetch failed');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Unknown error' });
    }
}

// Exporting the functions
module.exports = {
    logBreedingEvent,
    getBreedingEvents
};