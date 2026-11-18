BEGIN;

CREATE UNIQUE INDEX lounges_name_unique_ci
ON lounges (LOWER(name));

COMMIT;