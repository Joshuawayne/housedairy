function calculateCowYears(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    const ageDays = (today - birth) / (1000 * 60 * 60 * 24);
    const ageYears = ageDays / 365;
    if (ageYears < 1) return ageYears;
    if (ageYears < 2.5) return ageYears * 1.5; // Heifer matures faster
    return ageYears;
}

function updateCategory(ageCowYears) {
    if (ageCowYears < 1) return 'Calf';
    if (ageCowYears < 2.5) return 'Heifer';
    return 'Cow';
}

module.exports = { calculateCowYears, updateCategory };
