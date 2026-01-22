
--Row Level Security (RLS) aktivieren für alle Tabellen
ALTER TABLE public."user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

--RLS Policies erstellen
--die anderen Tabellen müssen auf Tabelle "user" zugreifen dürfen
CREATE POLICY "User darf eigenes Profil lesen" ON public."user" FOR SELECT USING (auth.uid()::text = supabaseid);
CREATE POLICY "User darf eigenes Profil updaten" ON public."user" FOR UPDATE USING (auth.uid()::text = supabaseid);
CREATE POLICY "User darf Profil erstellen" ON public."user" FOR INSERT WITH CHECK (auth.uid()::text = supabaseid);

--Policy für Budgets
CREATE POLICY "User verwaltet eigenes Budget" ON public.budgets FOR ALL USING (user_id IN ( SELECT userid FROM public."user" WHERE supabaseid = auth.uid()::text ));

--Policy für Kategorien
CREATE POLICY "User verwaltet eigene Kategorien" ON public.categories FOR ALL USING (user_id IN ( SELECT userid FROM public."user" WHERE supabaseid = auth.uid()::text ));

--Policy für Ausgaben
CREATE POLICY "User verwaltet eigene Ausgaben" ON public.expenses FOR ALL USING (user_id IN ( SELECT userid FROM public."user" WHERE supabaseid = auth.uid()::text ));

--Policy für Einnahmen
CREATE POLICY "User verwaltet eigene Einnahmen" ON public.incomes FOR ALL USING (user_id IN ( SELECT userid FROM public."user" WHERE supabaseid = auth.uid()::text ));

--Policy für Ziele
CREATE POLICY "User verwaltet eigene Ziele" ON public.goals FOR ALL USING (user_id IN ( SELECT userid FROM public."user" WHERE supabaseid = auth.uid()::text ));

--Berechtigungen für Rollen setzen
GRANT ALL ON TABLE public."user" TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.budgets TO anon,authenticated, service_role;
GRANT ALL ON TABLE public.categories TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.expenses TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.incomes TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.goals TO anon, authenticated, service_role;

--Berechtigungen für Sequenzen setzen
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role