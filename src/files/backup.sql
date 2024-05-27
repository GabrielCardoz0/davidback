--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id integer NOT NULL,
    cep character varying(30) NOT NULL,
    street character varying(180) NOT NULL,
    neighborhood character varying(180) NOT NULL,
    city character varying(180) NOT NULL,
    state character varying(10) NOT NULL,
    number character varying(10) NOT NULL,
    created_at date DEFAULT '2024-02-19'::date NOT NULL,
    updated_at date DEFAULT '2024-02-19'::date NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.addresses_id_seq OWNER TO postgres;

--
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- Name: colaborator_services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colaborator_services (
    id integer NOT NULL,
    colaborator_id integer NOT NULL,
    service_id integer NOT NULL,
    frequency_id integer NOT NULL
);


ALTER TABLE public.colaborator_services OWNER TO postgres;

--
-- Name: colaborator_services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colaborator_services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.colaborator_services_id_seq OWNER TO postgres;

--
-- Name: colaborator_services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colaborator_services_id_seq OWNED BY public.colaborator_services.id;


--
-- Name: colaborators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colaborators (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    cpf character varying(30) NOT NULL,
    genre character varying(10) NOT NULL,
    email character varying(220) NOT NULL,
    tel character varying(120) NOT NULL,
    birthday character varying(120) NOT NULL,
    company_name character varying(120) NOT NULL,
    registered boolean DEFAULT false NOT NULL,
    form_id integer NOT NULL,
    address_id integer NOT NULL,
    created_at date DEFAULT '2024-02-19'::date NOT NULL,
    updated_at date DEFAULT '2024-02-19'::date NOT NULL
);


ALTER TABLE public.colaborators OWNER TO postgres;

--
-- Name: colaborators_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colaborators_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.colaborators_id_seq OWNER TO postgres;

--
-- Name: colaborators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colaborators_id_seq OWNED BY public.colaborators.id;


--
-- Name: form_services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.form_services (
    id integer NOT NULL,
    form_id integer NOT NULL,
    service_id integer NOT NULL
);


ALTER TABLE public.form_services OWNER TO postgres;

--
-- Name: form_services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.form_services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.form_services_id_seq OWNER TO postgres;

--
-- Name: form_services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.form_services_id_seq OWNED BY public.form_services.id;


--
-- Name: forms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forms (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    identify character varying(220) NOT NULL,
    created_at date DEFAULT '2024-02-19'::date NOT NULL,
    updated_at date DEFAULT '2024-02-19'::date NOT NULL
);


ALTER TABLE public.forms OWNER TO postgres;

--
-- Name: forms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.forms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.forms_id_seq OWNER TO postgres;

--
-- Name: forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.forms_id_seq OWNED BY public.forms.id;


--
-- Name: frequencies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.frequencies (
    id integer NOT NULL,
    frequency character varying(120) NOT NULL,
    service_id integer NOT NULL,
    created_at date DEFAULT '2024-02-19'::date NOT NULL,
    updated_at date DEFAULT '2024-02-19'::date NOT NULL,
    value integer
);


ALTER TABLE public.frequencies OWNER TO postgres;

--
-- Name: frequencies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.frequencies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.frequencies_id_seq OWNER TO postgres;

--
-- Name: frequencies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.frequencies_id_seq OWNED BY public.frequencies.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id integer NOT NULL,
    name character varying(180) NOT NULL,
    base_price real NOT NULL,
    colaborator_percent real NOT NULL,
    colaborator_value real NOT NULL,
    repass_percent real NOT NULL,
    repass_value real NOT NULL,
    profit real NOT NULL,
    genre character varying(20) NOT NULL,
    created_at date DEFAULT '2024-02-19'::date NOT NULL,
    updated_at date DEFAULT '2024-02-19'::date NOT NULL
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.services_id_seq OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(250) NOT NULL,
    password character varying(180) NOT NULL,
    created_at date DEFAULT '2024-02-19'::date NOT NULL,
    updated_at date DEFAULT '2024-02-19'::date NOT NULL,
    name character varying(120)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- Name: colaborator_services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborator_services ALTER COLUMN id SET DEFAULT nextval('public.colaborator_services_id_seq'::regclass);


--
-- Name: colaborators id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborators ALTER COLUMN id SET DEFAULT nextval('public.colaborators_id_seq'::regclass);


--
-- Name: form_services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_services ALTER COLUMN id SET DEFAULT nextval('public.form_services_id_seq'::regclass);


--
-- Name: forms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms ALTER COLUMN id SET DEFAULT nextval('public.forms_id_seq'::regclass);


--
-- Name: frequencies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frequencies ALTER COLUMN id SET DEFAULT nextval('public.frequencies_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses (id, cep, street, neighborhood, city, state, number, created_at, updated_at) FROM stdin;
1							2024-02-19	2024-02-19
2							2024-02-19	2024-02-19
3							2024-02-19	2024-02-19
4							2024-02-19	2024-02-19
5							2024-02-19	2024-02-19
6							2024-02-19	2024-02-19
7							2024-02-19	2024-02-19
8							2024-02-19	2024-02-19
9	06700-499	Rua Cabrália	Jardim Araruama	Cotia	SP		2024-02-19	2024-02-19
10	06700-499	Rua Cabrália	Jardim Araruama	Cotia	SP		2024-02-19	2024-02-19
11							2024-02-19	2024-02-19
12							2024-02-19	2024-02-19
13							2024-02-19	2024-02-19
14							2024-02-19	2024-02-19
15							2024-02-19	2024-02-19
16							2024-02-19	2024-02-19
17							2024-02-19	2024-02-19
18							2024-02-19	2024-02-19
19							2024-02-19	2024-02-19
20							2024-02-19	2024-02-19
21							2024-02-19	2024-02-19
22							2024-02-19	2024-02-19
23							2024-02-19	2024-02-19
24	06700-499	Rua Cabrália	Jardim Araruama	Cotia	SP		2024-02-19	2024-02-19
\.


--
-- Data for Name: colaborator_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colaborator_services (id, colaborator_id, service_id, frequency_id) FROM stdin;
4	4	27	43
5	4	26	41
8	5	27	43
9	5	26	41
12	6	26	41
15	8	26	41
16	9	27	43
17	11	27	43
18	12	27	44
19	13	27	44
20	14	27	44
21	15	26	41
22	16	26	41
23	17	27	43
24	18	26	42
25	19	27	43
\.


--
-- Data for Name: colaborators; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colaborators (id, name, cpf, genre, email, tel, birthday, company_name, registered, form_id, address_id, created_at, updated_at) FROM stdin;
5	gabriel	48471261812		gabriel@gmail.com	1122345567	2024-04-08	top	t	21	10	2024-02-19	2024-02-19
4	gabriel	48471261812		gabriel@gmail.com	1122345567	2024-04-08	top	t	21	9	2024-02-19	2024-02-19
6	gabriel	48471261812		gabriel@gmail.com	1122345567	2024-04-24	top	t	21	11	2024-02-19	2024-02-19
9	gabriel	48471261812		gabriel@gmail.com	1122345567	12-12-2024	top	f	21	15	2024-02-19	2024-02-19
10	gabriel	48471261812		gabriel@gmail.com	1122345567	12-12-2024	top	f	21	14	2024-02-19	2024-02-19
11	gabriel	48471261812		gabriel@gmail.com	1122345567	12-12-2024	top	f	21	16	2024-02-19	2024-02-19
12	gabriel	48471261812	masculino	gabriel@gmail.com	1122345567	2024-05-22	top	f	21	17	2024-02-19	2024-02-19
18	gabriel	48471261812	masculino	gabriel@gmail.com	1122345567	2024-05-23	top	t	21	23	2024-02-19	2024-02-19
16	gabriel	48471261812	masculino	gabriel@gmail.com	1122345567	2024-05-23	top	t	21	21	2024-02-19	2024-02-19
15	gabriel	48471261812	masculino	gabriel@gmail.com	1122345567	2024-05-23	top	t	21	20	2024-02-19	2024-02-19
17	gabriel	48471261812	masculino	gabriel@gmail.com	1122345567	2024-05-23	top	t	21	22	2024-02-19	2024-02-19
8	gabriel	48471261812		gabriel@gmail.com	1122345567	2024-05-08	top	t	21	13	2024-02-19	2024-02-19
14	gabriel	48471261812	feminino	gabriel@gmail.com	1122345567	2024-05-22	top	t	21	19	2024-02-19	2024-02-19
13	gabriel	48471261812	feminino	gabriel@gmail.com	1122345567	2024-05-22	top	t	21	18	2024-02-19	2024-02-19
19	gabriel cardozo	484.712.619-12	feminino	admin@admin.com	(11) 99470-3386	2004-10-29	Empresa	t	21	24	2024-02-19	2024-02-19
\.


--
-- Data for Name: form_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.form_services (id, form_id, service_id) FROM stdin;
43	21	27
44	21	26
47	22	26
48	22	28
49	23	30
50	23	28
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forms (id, name, identify, created_at, updated_at) FROM stdin;
21	Formulário Geral	b1b34bfb-e95b-49b9-bb6c-d7e82c58d7c5	2024-02-19	2024-02-19
22	formulário gabriel	48ffaf32-871e-4a99-82d4-3d70b0f7d71a	2024-02-19	2024-02-19
23	teste erro	f0ecd2e1-7baa-457a-8734-5e663617ebd8	2024-02-19	2024-02-19
\.


--
-- Data for Name: frequencies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.frequencies (id, frequency, service_id, created_at, updated_at, value) FROM stdin;
41	1x por mês	26	2024-02-19	2024-02-19	1
42	 2x por mês	26	2024-02-19	2024-02-19	2
43	1x por mês	27	2024-02-19	2024-02-19	1
44	 2x por mês	27	2024-02-19	2024-02-19	2
45	1x por semana	28	2024-02-19	2024-02-19	1
46	2x por semana	29	2024-02-19	2024-02-19	2
47	2X POR SEMANA	30	2024-02-19	2024-02-19	2
48	4X POR SEMANA	31	2024-02-19	2024-02-19	4
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, name, base_price, colaborator_percent, colaborator_value, repass_percent, repass_value, profit, genre, created_at, updated_at) FROM stdin;
26	Hidração de cabelo	50	20	40	25	8	32	feminino	2024-02-19	2024-02-19
27	Escova e Prancha	50	20	40	25	8	32	feminino	2024-02-19	2024-02-19
28	Pentear 	40	20	32	12	6.4	25.6	masculino	2024-02-19	2024-02-19
29	123	30	20	24	20	4.8	19.2	unissex	2024-02-19	2024-02-19
31	EDIT 222	50	50	25	60	12.5	12.5	unissex	2024-02-19	2024-02-19
30	Teste edit novamente	120	50	60	50	30	30	masculino	2024-02-19	2024-02-19
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, created_at, updated_at, name) FROM stdin;
1	david@email.com	123456	2024-02-19	2024-02-19	DAVID
\.


--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.addresses_id_seq', 24, true);


--
-- Name: colaborator_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colaborator_services_id_seq', 25, true);


--
-- Name: colaborators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colaborators_id_seq', 19, true);


--
-- Name: form_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.form_services_id_seq', 50, true);


--
-- Name: forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forms_id_seq', 23, true);


--
-- Name: frequencies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.frequencies_id_seq', 48, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 31, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: addresses addresses_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pk PRIMARY KEY (id);


--
-- Name: colaborator_services colaborator_services_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborator_services
    ADD CONSTRAINT colaborator_services_pk PRIMARY KEY (id);


--
-- Name: colaborators colaborators_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborators
    ADD CONSTRAINT colaborators_pk PRIMARY KEY (id);


--
-- Name: form_services form_services_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_services
    ADD CONSTRAINT form_services_pk PRIMARY KEY (id);


--
-- Name: forms forms_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pk PRIMARY KEY (id);


--
-- Name: frequencies frequencies_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frequencies
    ADD CONSTRAINT frequencies_pk PRIMARY KEY (id);


--
-- Name: services services_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: colaborator_services colaborator_services_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborator_services
    ADD CONSTRAINT colaborator_services_fk0 FOREIGN KEY (colaborator_id) REFERENCES public.colaborators(id);


--
-- Name: colaborator_services colaborator_services_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborator_services
    ADD CONSTRAINT colaborator_services_fk1 FOREIGN KEY (service_id) REFERENCES public.services(id);


--
-- Name: colaborator_services colaborator_services_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborator_services
    ADD CONSTRAINT colaborator_services_fk2 FOREIGN KEY (frequency_id) REFERENCES public.frequencies(id);


--
-- Name: colaborators colaborators_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborators
    ADD CONSTRAINT colaborators_fk0 FOREIGN KEY (form_id) REFERENCES public.forms(id);


--
-- Name: colaborators colaborators_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborators
    ADD CONSTRAINT colaborators_fk1 FOREIGN KEY (address_id) REFERENCES public.addresses(id);


--
-- Name: form_services form_services_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_services
    ADD CONSTRAINT form_services_fk0 FOREIGN KEY (form_id) REFERENCES public.forms(id);


--
-- Name: form_services form_services_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_services
    ADD CONSTRAINT form_services_fk1 FOREIGN KEY (service_id) REFERENCES public.services(id);


--
-- Name: frequencies frequencies_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frequencies
    ADD CONSTRAINT frequencies_fk0 FOREIGN KEY (service_id) REFERENCES public.services(id);


--
-- PostgreSQL database dump complete
--

