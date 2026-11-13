BEGIN;

CREATE TABLE comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT comments_post_fk
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE,

    CONSTRAINT comments_author_fk
        FOREIGN KEY (author_id)
        REFERENCES users(id)
);

CREATE TABLE post_votes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    value SMALLINT NOT NULL,

    CONSTRAINT post_votes_post_fk
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE,

    CONSTRAINT post_votes_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT post_votes_value_check
        CHECK (value IN (-1, 1)),

    CONSTRAINT post_votes_unique_user_post
        UNIQUE (post_id, user_id)
);

COMMIT;