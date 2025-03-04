const supabase = require('../models/supabaseClient');

async function logMilkSession(req, res) {
    const { cow_id, session_type, liters, date } = req.body;

    try {
        const { data, error } = await supabase
            .from('milk_sessions')
            .insert([{ cow_id, session_type, liters, date }])
            .select();
        if (error) throw new Error(error.message);
        res.status(201).json({ message: 'Milk session logged', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMilkSessions(req, res) {
    try {
        const { data, error } = await supabase.from('milk_sessions').select('*, cow:cows!cow_id(tag)');
        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { logMilkSession, getMilkSessions };