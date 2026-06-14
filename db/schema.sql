CREATE TABLE urls (
  id          SERIAL        PRIMARY KEY,
  short_code  VARCHAR(20)   UNIQUE NOT NULL,
  long_url    TEXT          NOT NULL,
  created_at  TIMESTAMPTZ   DEFAULT NOW(),
  hits        INTEGER       DEFAULT 0
);