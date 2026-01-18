
--Test: Expense-Erstellung

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
('Emujin', 'Musterfrau', 'HTW Dresden', '2011-01-01', 'test-owner1@example.com', '11111111-1111-1111-1111-111111111111');

--Erstellen einer Kategorie für Expense-Tests
--notwendig aufgrund von Foreign Key Beziehungen zwischen Expense und Categories
INSERT INTO public.categories (name, type, id, user_id) VALUES
('Gehalt', 'expense', '1', (SELECT userid FROM public."user" WHERE supabaseid = '11111111-1111-1111-1111-111111111111'));

--Test-CategoryID setzen für Foreign Key Beziehungen
\set category_id (SELECT id FROM public.categories WHERE name = 'Gehalt' AND type = 'expense');

--Test-UserID setzen für Foreign Key Beziehungen
\set ownerid (SELECT userid FROM public."user" WHERE supabaseid = '11111111-1111-1111-1111-111111111111');

--Authentifizierten User simulieren
SET "request.jwt.claims.sub" TO '11111111-1111-1111-1111-111111111111';
SET ROLE authenticated;

--Überprüfen, ob der User ein Expense erstellen kann
  SELECT lives_ok(
  $$ INSERT INTO public.expenses (user_id, amount, category_id, date, note) VALUES ( (SELECT userid FROM public."user" WHERE supabaseid = '11111111-1111-1111-1111-111111111111'), 1234, '1', '2023-09-08', 'PC') $$,
  'Besitzer kann eigenes Expense erstellen'
);

--Aswertung der Tests
SELECT * FROM finish();

--Änderungen rückgängig machen
ROLLBACK;