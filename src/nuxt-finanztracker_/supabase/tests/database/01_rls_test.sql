
-- Test: Ist Row-Level Security aktiviert?

--SQL-Befehle für supabase zum aktieren von RLS, falls deaktiviert:
-- ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.incomes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

--Start
BEGIN;

-- Wie viele Tests ausgeführt werden
SELECT plan(6);

-- Überprüfen, ob Row-Level Security für die Tabellen aktiviert ist
SELECT results_eq(
    $$ SELECT rowsecurity FROM pg_tables WHERE tablename = 'user' AND schemaname = 'public' $$,
    $$ SELECT true $$,
    'Row-Level Security ist für die Tabelle user aktiviert'
);

SELECT results_eq(
    $$ SELECT rowsecurity FROM pg_tables WHERE tablename = 'budgets' AND schemaname = 'public' $$,
    $$ SELECT true $$,
    'Row-Level Security ist für die Tabelle budgets aktiviert'
);

SELECT results_eq(
    $$ SELECT rowsecurity FROM pg_tables WHERE tablename = 'incomes' AND schemaname = 'public' $$,
    $$ SELECT true $$,
    'Row-Level Security ist für die Tabelle incomes aktiviert'
);

SELECT results_eq(
    $$ SELECT rowsecurity FROM pg_tables WHERE tablename = 'expenses' AND schemaname = 'public' $$,
    $$ SELECT true $$,
    'Row-Level Security ist für die Tabelle expenses aktiviert'
);

SELECT results_eq(
    $$ SELECT rowsecurity FROM pg_tables WHERE tablename = 'goals' AND schemaname = 'public' $$,
    $$ SELECT true $$,
    'Row-Level Security ist für die Tabelle goals aktiviert'
);

SELECT results_eq(
    $$ SELECT rowsecurity FROM pg_tables WHERE tablename = 'categories' AND schemaname = 'public' $$,
    $$ SELECT true $$,
    'Row-Level Security ist für die Tabelle categories aktiviert'
);

-- Auswertung der Tests
SELECT * FROM finish();

-- Änderungen rückgängig machen
ROLLBACK;

