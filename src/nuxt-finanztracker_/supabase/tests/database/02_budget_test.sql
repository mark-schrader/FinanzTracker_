
--Test: Budget-Erstellung

--Start
BEGIN;

--pgTAP Extension laden
CREATE EXTENSION IF NOT EXISTS pgtap;

--Wie viele Tests ausgeführt werden
SELECT plan(1);

--Test-Userid und Email anlegen
INSERT INTO auth.users (id, email) VALUES ('11111111-1111-1111-1111-111111111111', 'test-owner1@example.com');

--Test-User mit Daten füllen
INSERT INTO public."user" (firstname, lastname, university, birthdate, email, supabaseid) VALUES
('Erik', 'Mustermann', 'HTW Dresden', '2000-01-01', 'test-owner1@example.com', '11111111-1111-1111-1111-111111111111');

--Test-UserID setzen für Foreign Key Beziehungen
\set ownerid (SELECT userid FROM public."user" WHERE supabaseid = '11111111-1111-1111-1111-111111111111');

--Authentifizierten User simulieren
SET "request.jwt.claims.sub" TO '11111111-1111-1111-1111-111111111111';
SET ROLE authenticated;

--Überprüfen, ob der User ein Budget erstellen kann
  SELECT lives_ok(
  $$ INSERT INTO public.budgets (user_id, period, amount) VALUES ( (SELECT userid FROM public."user" WHERE supabaseid = '11111111-1111-1111-1111-111111111111'), '2023-10', 500.00) $$,
  'Besitzer kann eigenes Budget erstellen'
);

--Aswertung der Tests
SELECT * FROM finish();

--Änderungen rückgängig machen
ROLLBACK;