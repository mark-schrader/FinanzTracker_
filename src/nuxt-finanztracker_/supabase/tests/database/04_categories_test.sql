
--Test: Categorie-Erstellung

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
('Til', 'Mustermann', 'HTW Dresden', '1980-01-01', 'test-owner1@example.com', '11111111-1111-1111-1111-111111111111');

--Test-UserID setzen für Foreign Key Beziehungen
\set ownerid (SELECT userid FROM public."user" WHERE supabaseid = '11111111-1111-1111-1111-111111111111');

--Authentifizierten User simulieren
SET "request.jwt.claim.sub" TO '11111111-1111-1111-1111-111111111111';
SET ROLE authenticated;

--Überprüfen, ob der User eine Kategorie erstellen kann
  SELECT lives_ok(
  $$ INSERT INTO public.categories (user_id, name, type, color) VALUES ( (SELECT userid FROM public."user" WHERE supabaseid = '11111111-1111-1111-1111-111111111111'), 'Bier', 'expense', '#0044ff') $$,
  'Besitzer kann eigene Kategorie erstellen'
);

--Aswertung der Tests
SELECT * FROM finish();

--Änderungen rückgängig machen
ROLLBACK;