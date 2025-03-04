 CREATE TABLE cows (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50),
    birth_date DATE,
    purchase_date DATE,
    age_cow_years FLOAT, -- Calculated via formula
    category VARCHAR(10), -- Calf, Heifer, Cow
    status VARCHAR(20), -- Eligible, Pregnant, Dry, etc.
    group_name VARCHAR(50), -- Custom grouping
    dam_id INT REFERENCES cows(id), -- Mother
    sire_id INT REFERENCES cows(id), -- Father
    granddam_id INT REFERENCES cows(id), -- Grandmother
    grandsire_id INT REFERENCES cows(id) -- Grandfather
);
ALTER TABLE cows ADD COLUMN lifecycle VARCHAR(20);


