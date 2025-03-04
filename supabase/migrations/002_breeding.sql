 CREATE TABLE breeding_events (
    id SERIAL PRIMARY KEY,
    cow_id INT REFERENCES cows(id),
    stage VARCHAR(20), -- pre_heat, heat, post_heat, pregnant
    date DATE,
    success BOOLEAN,
    insemination_date DATE,
    early_edd DATE,
    normal_edd DATE,
    late_edd DATE,
    steaming_date DATE,
    drying_date DATE
);
