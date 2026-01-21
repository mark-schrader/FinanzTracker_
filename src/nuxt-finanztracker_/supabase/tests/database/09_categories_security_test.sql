
--Test: Kann User 1 die Categories von User 2 sehen?

--Start
BEGIN;

--pgTAP Extension laden
CREATE EXTENSION IF NOT EXISTS pgtap;

--Wie viele Tests ausgeführt werden
SELECT plan(1);

--Test-Userid und Email für User 1 anlegen
INSERT INTO auth.users (id, email) VALUES ('11111111-1111-1111-1111-111111111111', 'test-owner1@example.com');

--Test-User 1 mit Daten füllen
INSERT INTO public."user" (firstname, lastname, university, birthdate, email, supabaseid) VALUES
('Justus', 'Mustermann', 'HTW Dresden', '1990-01-01', 'test-owner1@example.com', '11111111-1111-1111-1111-111111111111');

--Test-Userid und Email für User 2 anlegen
INSERT INTO auth.users (id, email) VALUES ('22222222-2222-2222-2222-222222222222', 'test-owner2@example.com');

--Test-User 2 mit Daten füllen
INSERT INTO public."user" (firstname, lastname, university, birthdate, email, supabaseid) VALUES
('Erika', 'Mustermann', 'HTW Dresden', '1992-02-02', 'test-owner2@example.com', '22222222-2222-2222-2222-222222222222');

--Test-UserIDs setzen für Foreign Key Beziehungen
\set owner1id (SELECT userid FROM public."user" WHERE supabaseid = '11111111-1111-1111-1111-111111111111');
\set owner2id (SELECT userid FROM public."user" WHERE supabaseid = '22222222-2222-2222-2222-222222222222');

--Authentifizierten User 1 simulieren
SET "request.jwt.claim.sub" TO '11111111-1111-1111-1111-111111111111';
SET ROLE authenticated;

--Categories für User 1 anlegen
INSERT INTO public.categories (user_id, name, type, color) VALUES ( (SELECT userid FROM public."user" WHERE supabaseid = '11111111-1111-1111-1111-111111111111'), 'Einkauf', 'expense', '#00fff2');

--Authentifizierng zu User 2 wechseln
SET "request.jwt.claim.sub" TO '22222222-2222-2222-2222-222222222222';
SET ROLE authenticated;

--Überprüfen, ob User 2 das Goal von User 1 sehen kann
  SELECT is_empty(
  $$ SELECT * FROM public.categories WHERE user_id = (SELECT userid FROM public."user" WHERE supabaseid = '11111111-1111-1111-1111-111111111111') $$,
  'User 2 kann die Categories von User 2 nicht sehen'
);

--Aswertung der Tests
SELECT * FROM finish();

--Änderungen rückgängig machen
ROLLBACK;


