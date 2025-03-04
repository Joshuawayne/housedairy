 CREATE TABLE milk_sessions (
    id SERIAL PRIMARY KEY,
    cow_id INT REFERENCES cows(id),
    session_type VARCHAR(20), -- Morning, Afternoon, Evening
    liters FLOAT,
    date DATE
);
