const supabase = require('../models/supabaseClient');
const { calculateCowYears, updateCategory } = require('../models/cowAgeCalc');

async function registerCow(req, res) {
    const { tag, name, birth_date, purchase_date, dam_id, sire_id, granddam_id, grandsire_id, group_name } = req.body;

    if (!tag) return res.status(400).json({ error: 'Tag is required' });

    let age_cow_years = null;
    let category = null;
    if (birth_date) {
        age_cow_years = calculateCowYears(birth_date);
        category = updateCategory(age_cow_years);
    }

    const lifecycle = birth_date ? 'Born' : purchase_date ? 'Purchased' : 'Unknown';
    const status = age_cow_years && age_cow_years >= 1.5 ? 'Eligible' : 'N/A';

    try {
        const { data, error } = await supabase
            .from('cows')
            .insert([{ tag, name, birth_date, purchase_date, age_cow_years, category, status, group_name, dam_id, sire_id, granddam_id, grandsire_id, lifecycle }])
            .select();
        if (error) throw error;
        res.status(201).json({ message: 'Cow registered', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCows(req, res) {
    try {
        const { data, error } = await supabase
            .from('cows')
            .select('*, dam:dam_id(tag), sire:sire_id(tag), granddam:granddam_id(tag), grandsire:grandsire_id(tag)');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { registerCow, getCows };