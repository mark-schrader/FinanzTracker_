create type "public"."interval_type" as enum ('once', 'weekly', 'monthly', 'semesterly', 'annual');

create sequence "public"."budgets_id_seq";

create sequence "public"."categories_id_seq";

create sequence "public"."expenses_id_seq";

create sequence "public"."goals_id_seq";

create sequence "public"."incomes_id_seq";

create sequence "public"."user_userid_seq";


  create table "public"."budgets" (
    "id" integer not null default nextval('public.budgets_id_seq'::regclass),
    "user_id" integer not null,
    "period" text not null,
    "amount" numeric(10,2) not null,
    "created_at" timestamp(6) without time zone default CURRENT_TIMESTAMP
      );



  create table "public"."categories" (
    "id" integer not null default nextval('public.categories_id_seq'::regclass),
    "name" text not null,
    "type" text not null,
    "user_id" integer,
    "icon" text,
    "color" text
      );



  create table "public"."expenses" (
    "id" integer not null default nextval('public.expenses_id_seq'::regclass),
    "user_id" integer not null,
    "category_id" integer not null,
    "use" text,
    "amount" numeric(10,2) not null,
    "date" date not null,
    "interval" public.interval_type not null default 'once'::public.interval_type,
    "note" text
      );



  create table "public"."goals" (
    "id" integer not null default nextval('public.goals_id_seq'::regclass),
    "user_id" integer not null,
    "name" text not null,
    "target" numeric(10,2) not null,
    "saved" numeric(10,2) not null default 0,
    "due_date" date not null,
    "created_at" timestamp(6) without time zone default CURRENT_TIMESTAMP
      );



  create table "public"."incomes" (
    "id" integer not null default nextval('public.incomes_id_seq'::regclass),
    "user_id" integer not null,
    "category_id" integer not null,
    "source" text,
    "amount" numeric(10,2) not null,
    "date" date not null,
    "interval" public.interval_type not null default 'once'::public.interval_type,
    "note" text
      );



  create table "public"."user" (
    "userid" integer not null default nextval('public.user_userid_seq'::regclass),
    "firstname" text not null,
    "lastname" text not null,
    "university" text not null,
    "birthdate" timestamp(3) without time zone not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "username" text,
    "email" text not null,
    "startamount" integer,
    "supabaseid" text not null
      );


alter sequence "public"."budgets_id_seq" owned by "public"."budgets"."id";

alter sequence "public"."categories_id_seq" owned by "public"."categories"."id";

alter sequence "public"."expenses_id_seq" owned by "public"."expenses"."id";

alter sequence "public"."goals_id_seq" owned by "public"."goals"."id";

alter sequence "public"."incomes_id_seq" owned by "public"."incomes"."id";

alter sequence "public"."user_userid_seq" owned by "public"."user"."userid";

CREATE UNIQUE INDEX "User_email_key" ON public."user" USING btree (email);

CREATE UNIQUE INDEX "User_pkey" ON public."user" USING btree (userid);

CREATE UNIQUE INDEX budgets_pkey ON public.budgets USING btree (id);

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX expenses_pkey ON public.expenses USING btree (id);

CREATE UNIQUE INDEX goals_pkey ON public.goals USING btree (id);

CREATE UNIQUE INDEX incomes_pkey ON public.incomes USING btree (id);

CREATE UNIQUE INDEX user_supabaseid_key ON public."user" USING btree (supabaseid);

alter table "public"."budgets" add constraint "budgets_pkey" PRIMARY KEY using index "budgets_pkey";

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."expenses" add constraint "expenses_pkey" PRIMARY KEY using index "expenses_pkey";

alter table "public"."goals" add constraint "goals_pkey" PRIMARY KEY using index "goals_pkey";

alter table "public"."incomes" add constraint "incomes_pkey" PRIMARY KEY using index "incomes_pkey";

alter table "public"."user" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

alter table "public"."budgets" add constraint "budgets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(userid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."budgets" validate constraint "budgets_user_id_fkey";

alter table "public"."categories" add constraint "categories_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(userid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."categories" validate constraint "categories_user_id_fkey";

alter table "public"."expenses" add constraint "expenses_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id) not valid;

alter table "public"."expenses" validate constraint "expenses_category_id_fkey";

alter table "public"."expenses" add constraint "expenses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(userid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."expenses" validate constraint "expenses_user_id_fkey";

alter table "public"."goals" add constraint "goals_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(userid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."goals" validate constraint "goals_user_id_fkey";

alter table "public"."incomes" add constraint "incomes_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id) not valid;

alter table "public"."incomes" validate constraint "incomes_category_id_fkey";

alter table "public"."incomes" add constraint "incomes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(userid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."incomes" validate constraint "incomes_user_id_fkey";

grant delete on table "public"."budgets" to "anon";

grant insert on table "public"."budgets" to "anon";

grant references on table "public"."budgets" to "anon";

grant select on table "public"."budgets" to "anon";

grant trigger on table "public"."budgets" to "anon";

grant truncate on table "public"."budgets" to "anon";

grant update on table "public"."budgets" to "anon";

grant delete on table "public"."budgets" to "authenticated";

grant insert on table "public"."budgets" to "authenticated";

grant references on table "public"."budgets" to "authenticated";

grant select on table "public"."budgets" to "authenticated";

grant trigger on table "public"."budgets" to "authenticated";

grant truncate on table "public"."budgets" to "authenticated";

grant update on table "public"."budgets" to "authenticated";

grant delete on table "public"."budgets" to "service_role";

grant insert on table "public"."budgets" to "service_role";

grant references on table "public"."budgets" to "service_role";

grant select on table "public"."budgets" to "service_role";

grant trigger on table "public"."budgets" to "service_role";

grant truncate on table "public"."budgets" to "service_role";

grant update on table "public"."budgets" to "service_role";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."expenses" to "anon";

grant insert on table "public"."expenses" to "anon";

grant references on table "public"."expenses" to "anon";

grant select on table "public"."expenses" to "anon";

grant trigger on table "public"."expenses" to "anon";

grant truncate on table "public"."expenses" to "anon";

grant update on table "public"."expenses" to "anon";

grant delete on table "public"."expenses" to "authenticated";

grant insert on table "public"."expenses" to "authenticated";

grant references on table "public"."expenses" to "authenticated";

grant select on table "public"."expenses" to "authenticated";

grant trigger on table "public"."expenses" to "authenticated";

grant truncate on table "public"."expenses" to "authenticated";

grant update on table "public"."expenses" to "authenticated";

grant delete on table "public"."expenses" to "service_role";

grant insert on table "public"."expenses" to "service_role";

grant references on table "public"."expenses" to "service_role";

grant select on table "public"."expenses" to "service_role";

grant trigger on table "public"."expenses" to "service_role";

grant truncate on table "public"."expenses" to "service_role";

grant update on table "public"."expenses" to "service_role";

grant delete on table "public"."goals" to "anon";

grant insert on table "public"."goals" to "anon";

grant references on table "public"."goals" to "anon";

grant select on table "public"."goals" to "anon";

grant trigger on table "public"."goals" to "anon";

grant truncate on table "public"."goals" to "anon";

grant update on table "public"."goals" to "anon";

grant delete on table "public"."goals" to "authenticated";

grant insert on table "public"."goals" to "authenticated";

grant references on table "public"."goals" to "authenticated";

grant select on table "public"."goals" to "authenticated";

grant trigger on table "public"."goals" to "authenticated";

grant truncate on table "public"."goals" to "authenticated";

grant update on table "public"."goals" to "authenticated";

grant delete on table "public"."goals" to "service_role";

grant insert on table "public"."goals" to "service_role";

grant references on table "public"."goals" to "service_role";

grant select on table "public"."goals" to "service_role";

grant trigger on table "public"."goals" to "service_role";

grant truncate on table "public"."goals" to "service_role";

grant update on table "public"."goals" to "service_role";

grant delete on table "public"."incomes" to "anon";

grant insert on table "public"."incomes" to "anon";

grant references on table "public"."incomes" to "anon";

grant select on table "public"."incomes" to "anon";

grant trigger on table "public"."incomes" to "anon";

grant truncate on table "public"."incomes" to "anon";

grant update on table "public"."incomes" to "anon";

grant delete on table "public"."incomes" to "authenticated";

grant insert on table "public"."incomes" to "authenticated";

grant references on table "public"."incomes" to "authenticated";

grant select on table "public"."incomes" to "authenticated";

grant trigger on table "public"."incomes" to "authenticated";

grant truncate on table "public"."incomes" to "authenticated";

grant update on table "public"."incomes" to "authenticated";

grant delete on table "public"."incomes" to "service_role";

grant insert on table "public"."incomes" to "service_role";

grant references on table "public"."incomes" to "service_role";

grant select on table "public"."incomes" to "service_role";

grant trigger on table "public"."incomes" to "service_role";

grant truncate on table "public"."incomes" to "service_role";

grant update on table "public"."incomes" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";


