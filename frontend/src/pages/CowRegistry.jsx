import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';
import CowRegistryTable from '../components/CowRegistryTable';

function CowRegistry() {
    const [cows, setCows] = useState([]);
    const [form, setForm] = useState({
        tag: '', name: '', birth_date: '', purchase_date: '',
        dam_id: '', sire_id: '', granddam_id: '', grandsire_id: '', group_name: ''
    });

    useEffect(() => {
        fetchCows();
    }, []);

    async function fetchCows() {
        const { data } = await supabase.from('cows').select('*');
        setCows(data || []);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { error } = await supabase.from('cows').insert([form]);
        if (!error) {
            alert('Cow registered!');
            fetchCows();
            setForm({ tag: '', name: '', birth_date: '', purchase_date: '', dam_id: '', sire_id: '', granddam_id: '', grandsire_id: '', group_name: '' });
        } else {
            alert('Error: ' + error.message);
        }
    }

    return (
        <div>
            <h1>Cow Registry</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Tag (e.g., C001)" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} required />
                <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input type="date" value={form.birth_date} onChange={e => setForm({ ...form, birth_date: e.target.value })} />
                <input type="date" value={form.purchase_date} onChange={e => setForm({ ...form, purchase_date: e.target.value })} />
                <input type="number" placeholder="Dam ID" value={form.dam_id} onChange={e => setForm({ ...form, dam_id: e.target.value })} />
                <input type="number" placeholder="Sire ID" value={form.sire_id} onChange={e => setForm({ ...form, sire_id: e.target.value })} />
                <input type="number" placeholder="Granddam ID" value={form.granddam_id} onChange={e => setForm({ ...form, granddam_id: e.target.value })} />
                <input type="number" placeholder="Grandsire ID" value={form.grandsire_id} onChange={e => setForm({ ...form, grandsire_id: e.target.value })} />
                <input type="text" placeholder="Group Name" value={form.group_name} onChange={e => setForm({ ...form, group_name: e.target.value })} />
                <button type="submit">Register Cow</button>
            </form>
            <CowRegistryTable cows={cows} />
        </div>
    );
}

export default CowRegistry;
