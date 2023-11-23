CREATE TABLE users (
    id              SERIAL              PRIMARY KEY UNIQUE,
    username        VARCHAR(30)         NOT NULL    UNIQUE,
    mail            VARCHAR(320)        NOT NULL    UNIQUE,
    role            VARCHAR(20)         NOT NULL,
    password        VARCHAR(60)         NOT NULL,
    created_at      TIMESTAMP           NOT NULL,
    last_connexion  TIMESTAMP           NOT NULL
);

INSERT INTO users(
    username,
    mail,
    role,
    password,
    created_at,
    last_connexion
)
VALUES(
    'Donoma',
    'dorianlevee@gmail.com',
    'user',
    'test',
    '2020-10-1',
    '2020-10-1'
);
