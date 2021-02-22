DROP TABLE IF EXISTS cards;

CREATE TABLE cards (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    key_term TEXT NOT NULL,
    definition TEXT NOT NULL,
    topic TEXT NOT NULL
);