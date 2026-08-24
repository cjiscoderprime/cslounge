BEGIN; 

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lounges (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id BIGINT NOT NULL,
    lounge_id BIGINT NOT NULL,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT posts_author_fk
        FOREIGN KEY (author_id)
        REFERENCES users(id),
    
    CONSTRAINT posts_lounge_fk
        FOREIGN KEY (lounge_id)
        REFERENCES lounges(id)    
);


INSERT INTO users (username) VALUES
('cj'),
('alex'),
('maya');

INSERT INTO lounges (name, slug) VALUES
('Systems', 'systems'),
('Databases', 'databases'),
('Cloud', 'cloud');

INSERT INTO posts (author_id, lounge_id, title, content) VALUES
(
    1, 
    1, 
    'How does Redis Caching actually work?',
    'Trying to understand when Redis should sit between an application and its database.'
),
(
    2,
    2,
    'What projects helped you learn PostgreSQL?',
    'looking for project ideas that require real SQL and database design.'
),
(
    3,
    3,
    'Should I learn Docker before Kubernetes?',
    'Trying to understand the right order for learning container infrastructure.'
);

COMMIT;

