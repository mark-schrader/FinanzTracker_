
--Test: Existieren die Tabellen?

--Start 
BEGIN;

--Wie viele Tests ausgeführt werden
SELECT plan(6);

--Überprüfen, ob die Tabellen existieren
SELECT has_table('public', 'user', 'Tabelle user existiert');
SELECT has_table('public', 'budgets', 'Tabelle budgets existiert');
SELECT has_table('public', 'incomes', 'Tabelle incomes existiert');
SELECT has_table('public', 'expenses', 'Tabelle expenses existiert');
SELECT has_table('public', 'goals', 'Tabelle goals existiert');
SELECT has_table('public', 'categories', 'Tabelle categories existiert');

--Aswertung der Tests
SELECT * FROM finish();

--Änderungen rückgängig machen
ROLLBACK;
