BEGIN;

ALTER TABLE lounges
ADD CONSTRAINT lounges_slug_unique
UNIQUE (slug);

COMMIT;

