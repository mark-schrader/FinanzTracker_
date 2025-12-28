
-- Test: Existieren die Tabellen und ist Row-Level Security aktiviert?

--SQL-Befehle für supabase zum aktieren von RLS, falls deaktiviert:
-- ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.incomes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

BEGIN;

SELECT plan(12);

SELECT has_table('public', 'user', 'Tabelle user existiert');
SELECT has_table('public', 'budgets', 'Tabelle budgets existiert');
SELECT has_table('public', 'incomes', 'Tabelle incomes existiert');
SELECT has_table('public', 'expenses', 'Tabelle expenses existiert');
SELECT has_table('public', 'goals', 'Tabelle goals existiert');
SELECT has_table('public', 'categories', 'Tabelle categories existiert');

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

SELECT * FROM finish();
ROLLBACK;

