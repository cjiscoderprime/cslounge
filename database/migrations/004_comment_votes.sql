BEGIN;

CREATE TABLE comment_votes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    comment_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    value SMALLINT NOT NULL,

    CONSTRAINT comment_votes_comment_fk
        FOREIGN KEY (comment_id)
        REFERENCES comments(id)
        ON DELETE CASCADE,

    CONSTRAINT comment_votes_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT comment_votes_value_check
        CHECK (value IN (-1, 1)),

    CONSTRAINT comment_votes_unique_user_comment
        UNIQUE (comment_id, user_id)
);

COMMIT;