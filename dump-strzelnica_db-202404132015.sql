--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-04-13 20:15:31

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

--
-- TOC entry 3509 (class 1262 OID 16389)
-- Name: strzelnica_db; Type: DATABASE; Schema: -; Owner: strzelnica_db_owner
--

CREATE DATABASE strzelnica_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE strzelnica_db OWNER TO strzelnica_db_owner;

\connect strzelnica_db

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3511 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 73770)
-- Name: competition; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.competition (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    start_date date,
    active boolean NOT NULL,
    description text
);


ALTER TABLE public.competition OWNER TO strzelnica_db_owner;

--
-- TOC entry 223 (class 1259 OID 73769)
-- Name: competitions_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

CREATE SEQUENCE public.competitions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.competitions_id_seq OWNER TO strzelnica_db_owner;

--
-- TOC entry 3512 (class 0 OID 0)
-- Dependencies: 223
-- Name: competitions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strzelnica_db_owner
--

ALTER SEQUENCE public.competitions_id_seq OWNED BY public.competition.id;


--
-- TOC entry 234 (class 1259 OID 81970)
-- Name: competitionweapon; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.competitionweapon (
    id integer NOT NULL,
    weapon_id integer NOT NULL,
    competition_id integer NOT NULL,
    shots_taken integer,
    CONSTRAINT weapon_price_check CHECK ((shots_taken >= 0))
);


ALTER TABLE public.competitionweapon OWNER TO strzelnica_db_owner;

--
-- TOC entry 233 (class 1259 OID 81969)
-- Name: competitionweapons_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

CREATE SEQUENCE public.competitionweapons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.competitionweapons_id_seq OWNER TO strzelnica_db_owner;

--
-- TOC entry 3513 (class 0 OID 0)
-- Dependencies: 233
-- Name: competitionweapons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strzelnica_db_owner
--

ALTER SEQUENCE public.competitionweapons_id_seq OWNED BY public.competitionweapon.id;


--
-- TOC entry 226 (class 1259 OID 81921)
-- Name: course; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.course (
    id integer NOT NULL,
    trainer_id integer NOT NULL,
    course_name character varying(100) NOT NULL,
    price money NOT NULL,
    CONSTRAINT course_price_check CHECK (((price)::numeric > (0)::numeric))
);


ALTER TABLE public.course OWNER TO strzelnica_db_owner;

--
-- TOC entry 225 (class 1259 OID 81920)
-- Name: course_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

CREATE SEQUENCE public.course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.course_id_seq OWNER TO strzelnica_db_owner;

--
-- TOC entry 3514 (class 0 OID 0)
-- Dependencies: 225
-- Name: course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strzelnica_db_owner
--

ALTER SEQUENCE public.course_id_seq OWNED BY public.course.id;


--
-- TOC entry 228 (class 1259 OID 81929)
-- Name: courseuser; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.courseuser (
    id integer NOT NULL,
    course_id integer NOT NULL,
    user_id integer NOT NULL,
    is_done boolean
);


ALTER TABLE public.courseuser OWNER TO strzelnica_db_owner;

--
-- TOC entry 227 (class 1259 OID 81928)
-- Name: courseuser_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

CREATE SEQUENCE public.courseuser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courseuser_id_seq OWNER TO strzelnica_db_owner;

--
-- TOC entry 3515 (class 0 OID 0)
-- Dependencies: 227
-- Name: courseuser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strzelnica_db_owner
--

ALTER SEQUENCE public.courseuser_id_seq OWNED BY public.courseuser.id;


--
-- TOC entry 231 (class 1259 OID 81953)
-- Name: weaponreservation; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.weaponreservation (
    id integer NOT NULL,
    user_id integer NOT NULL,
    weapon_id integer NOT NULL,
    reserved_from timestamp without time zone NOT NULL,
    reserved_to timestamp without time zone NOT NULL,
    price money NOT NULL,
    CONSTRAINT weaponreservation_date_check CHECK ((reserved_from < reserved_to))
);


ALTER TABLE public.weaponreservation OWNER TO strzelnica_db_owner;

--
-- TOC entry 230 (class 1259 OID 81952)
-- Name: gunreservations_type_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

CREATE SEQUENCE public.gunreservations_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gunreservations_type_seq OWNER TO strzelnica_db_owner;

--
-- TOC entry 3516 (class 0 OID 0)
-- Dependencies: 230
-- Name: gunreservations_type_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strzelnica_db_owner
--

ALTER SEQUENCE public.gunreservations_type_seq OWNED BY public.weaponreservation.id;


--
-- TOC entry 240 (class 1259 OID 82089)
-- Name: leaderboard; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.leaderboard (
    user_id integer NOT NULL,
    score integer NOT NULL
);


ALTER TABLE public.leaderboard OWNER TO strzelnica_db_owner;

--
-- TOC entry 216 (class 1259 OID 49179)
-- Name: news; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title character varying NOT NULL,
    picture character varying,
    date date DEFAULT CURRENT_DATE,
    author_id integer NOT NULL,
    content character varying,
    deleted boolean DEFAULT false
);


ALTER TABLE public.news OWNER TO strzelnica_db_owner;

--
-- TOC entry 215 (class 1259 OID 49178)
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE public.news ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.news_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 73763)
-- Name: registrationforcompetition; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.registrationforcompetition (
    id integer NOT NULL,
    user_id integer NOT NULL,
    competition_id integer NOT NULL
);


ALTER TABLE public.registrationforcompetition OWNER TO strzelnica_db_owner;

--
-- TOC entry 221 (class 1259 OID 73762)
-- Name: registrationforcompetitions_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

CREATE SEQUENCE public.registrationforcompetitions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.registrationforcompetitions_id_seq OWNER TO strzelnica_db_owner;

--
-- TOC entry 3517 (class 0 OID 0)
-- Dependencies: 221
-- Name: registrationforcompetitions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strzelnica_db_owner
--

ALTER SEQUENCE public.registrationforcompetitions_id_seq OWNED BY public.registrationforcompetition.id;


--
-- TOC entry 238 (class 1259 OID 82018)
-- Name: role; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.role OWNER TO strzelnica_db_owner;

--
-- TOC entry 239 (class 1259 OID 82043)
-- Name: score; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.score (
    id integer NOT NULL,
    competition_id integer NOT NULL,
    user_id integer NOT NULL,
    points integer NOT NULL,
    place integer,
    CONSTRAINT score_points_check CHECK ((place > 0))
);


ALTER TABLE public.score OWNER TO strzelnica_db_owner;

--
-- TOC entry 229 (class 1259 OID 81942)
-- Name: track; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.track (
    id integer NOT NULL,
    type_id integer NOT NULL,
    price_per_hour money NOT NULL,
    CONSTRAINT track_price_check CHECK (((price_per_hour)::numeric >= (0)::numeric))
);


ALTER TABLE public.track OWNER TO strzelnica_db_owner;

--
-- TOC entry 236 (class 1259 OID 81982)
-- Name: trackreservation; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.trackreservation (
    id integer NOT NULL,
    user_id integer NOT NULL,
    track_id integer NOT NULL,
    reserved_from timestamp without time zone NOT NULL,
    reserved_to timestamp without time zone NOT NULL,
    price money NOT NULL,
    CONSTRAINT trackreservation_dates_check CHECK ((reserved_from < reserved_to)),
    CONSTRAINT trackreservation_price_check CHECK (((price)::numeric >= (0)::numeric))
);


ALTER TABLE public.trackreservation OWNER TO strzelnica_db_owner;

--
-- TOC entry 235 (class 1259 OID 81981)
-- Name: trackreservation_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

CREATE SEQUENCE public.trackreservation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trackreservation_id_seq OWNER TO strzelnica_db_owner;

--
-- TOC entry 3518 (class 0 OID 0)
-- Dependencies: 235
-- Name: trackreservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strzelnica_db_owner
--

ALTER SEQUENCE public.trackreservation_id_seq OWNED BY public.trackreservation.id;


--
-- TOC entry 237 (class 1259 OID 81998)
-- Name: tracktype; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.tracktype (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.tracktype OWNER TO strzelnica_db_owner;

--
-- TOC entry 242 (class 1259 OID 90118)
-- Name: trainer; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.trainer (
    id integer NOT NULL,
    user_id integer NOT NULL,
    course_id integer NOT NULL
);


ALTER TABLE public.trainer OWNER TO strzelnica_db_owner;

--
-- TOC entry 241 (class 1259 OID 90117)
-- Name: trainer_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

CREATE SEQUENCE public.trainer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trainer_id_seq OWNER TO strzelnica_db_owner;

--
-- TOC entry 3519 (class 0 OID 0)
-- Dependencies: 241
-- Name: trainer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strzelnica_db_owner
--

ALTER SEQUENCE public.trainer_id_seq OWNED BY public.trainer.id;


--
-- TOC entry 218 (class 1259 OID 73729)
-- Name: users; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    date_of_birth date NOT NULL,
    club_member boolean NOT NULL
);


ALTER TABLE public.users OWNER TO strzelnica_db_owner;

--
-- TOC entry 217 (class 1259 OID 73728)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO strzelnica_db_owner;

--
-- TOC entry 3520 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strzelnica_db_owner
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;


--
-- TOC entry 220 (class 1259 OID 73751)
-- Name: userrole; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.userrole (
    id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.userrole OWNER TO strzelnica_db_owner;

--
-- TOC entry 219 (class 1259 OID 73750)
-- Name: userroles_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

CREATE SEQUENCE public.userroles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.userroles_id_seq OWNER TO strzelnica_db_owner;

--
-- TOC entry 3521 (class 0 OID 0)
-- Dependencies: 219
-- Name: userroles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strzelnica_db_owner
--

ALTER SEQUENCE public.userroles_id_seq OWNED BY public.userrole.id;


--
-- TOC entry 232 (class 1259 OID 81959)
-- Name: weapon; Type: TABLE; Schema: public; Owner: strzelnica_db_owner
--

CREATE TABLE public.weapon (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    uses_since_last_maintenance integer DEFAULT 0 NOT NULL,
    maintenance_every integer DEFAULT 0 NOT NULL,
    fit_for_use boolean NOT NULL,
    price_per_hour money NOT NULL,
    in_maintenance boolean DEFAULT false NOT NULL,
    serial_number character varying(40) NOT NULL,
    CONSTRAINT weapon_maintenance_check CHECK ((maintenance_every >= 0)),
    CONSTRAINT weapon_price_check CHECK (((price_per_hour)::numeric >= (0)::numeric)),
    CONSTRAINT weapon_uses_check CHECK ((uses_since_last_maintenance >= 0))
);


ALTER TABLE public.weapon OWNER TO strzelnica_db_owner;

--
-- TOC entry 243 (class 1259 OID 106496)
-- Name: weapon_id_seq; Type: SEQUENCE; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE public.weapon ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.weapon_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3260 (class 2604 OID 73773)
-- Name: competition id; Type: DEFAULT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.competition ALTER COLUMN id SET DEFAULT nextval('public.competitions_id_seq'::regclass);


--
-- TOC entry 3267 (class 2604 OID 81973)
-- Name: competitionweapon id; Type: DEFAULT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.competitionweapon ALTER COLUMN id SET DEFAULT nextval('public.competitionweapons_id_seq'::regclass);


--
-- TOC entry 3261 (class 2604 OID 81924)
-- Name: course id; Type: DEFAULT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.course ALTER COLUMN id SET DEFAULT nextval('public.course_id_seq'::regclass);


--
-- TOC entry 3262 (class 2604 OID 81932)
-- Name: courseuser id; Type: DEFAULT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.courseuser ALTER COLUMN id SET DEFAULT nextval('public.courseuser_id_seq'::regclass);


--
-- TOC entry 3259 (class 2604 OID 73766)
-- Name: registrationforcompetition id; Type: DEFAULT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.registrationforcompetition ALTER COLUMN id SET DEFAULT nextval('public.registrationforcompetitions_id_seq'::regclass);


--
-- TOC entry 3268 (class 2604 OID 81985)
-- Name: trackreservation id; Type: DEFAULT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.trackreservation ALTER COLUMN id SET DEFAULT nextval('public.trackreservation_id_seq'::regclass);


--
-- TOC entry 3269 (class 2604 OID 90121)
-- Name: trainer id; Type: DEFAULT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.trainer ALTER COLUMN id SET DEFAULT nextval('public.trainer_id_seq'::regclass);


--
-- TOC entry 3258 (class 2604 OID 73754)
-- Name: userrole id; Type: DEFAULT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.userrole ALTER COLUMN id SET DEFAULT nextval('public.userroles_id_seq'::regclass);


--
-- TOC entry 3257 (class 2604 OID 90150)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3263 (class 2604 OID 81956)
-- Name: weaponreservation id; Type: DEFAULT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.weaponreservation ALTER COLUMN id SET DEFAULT nextval('public.gunreservations_type_seq'::regclass);


--
-- TOC entry 3484 (class 0 OID 73770)
-- Dependencies: 224
-- Data for Name: competition; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3494 (class 0 OID 81970)
-- Dependencies: 234
-- Data for Name: competitionweapon; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3486 (class 0 OID 81921)
-- Dependencies: 226
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3488 (class 0 OID 81929)
-- Dependencies: 228
-- Data for Name: courseuser; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3500 (class 0 OID 82089)
-- Dependencies: 240
-- Data for Name: leaderboard; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3476 (class 0 OID 49179)
-- Dependencies: 216
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--

INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (3, 'Zawody strzeleckie w maju 2', NULL, '2024-03-28', 1, 'Zapraszamy wszystkich członków na zawody w maju.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (11, 'test2345', NULL, '2024-04-05', 1, 'test3', true);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (2, 'Nowy trener w klubie strzeleckim 2', NULL, '2024-03-15', 1, 'Klub strzelecki "Celność" ma nowego trenera!', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (5, 'Kurs dla początkujących 2', NULL, '2024-04-05', 1, 'Rusza kurs strzelecki dla osób początkujących.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (4, 'Remont strzelnicy', NULL, '2024-03-30', 1, 'Informujemy o remoncie strzelnicy - prosimy o cierpliwość.', true);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (89, 'Latest Update', 'image2.jpg', '2024-04-07', 2, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (90, 'Important Announcement', 'image3.jpg', '2024-04-06', 3, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (91, 'Exclusive Interview', 'image4.jpg', '2024-04-05', 4, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (92, 'Top Story of the Day', 'image5.jpg', '2024-04-04', 1, 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (93, 'Special Report', 'image6.jpg', '2024-04-03', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (94, 'Exclusive Coverage', 'image7.jpg', '2024-04-02', 1, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (95, 'In-depth Analysis', 'image8.jpg', '2024-04-01', 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (96, 'Breaking News Alert', 'image9.jpg', '2024-03-31', 1, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (97, 'Live Updates', 'image10.jpg', '2024-03-30', 1, 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (98, 'Investigative Report', 'image11.jpg', '2024-03-29', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (99, 'Feature Story', 'image12.jpg', '2024-03-28', 1, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (100, 'Behind the Scenes', 'image13.jpg', '2024-03-27', 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (101, 'Exclusive Coverage', 'image14.jpg', '2024-03-26', 1, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (102, 'Special Edition', 'image15.jpg', '2024-03-25', 1, 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (80, 'In-depth Analysis', 'image8.jpg', '2024-04-01', 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (81, 'Breaking News Alert', 'image9.jpg', '2024-03-31', 1, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (82, 'Live Updates', 'image10.jpg', '2024-03-30', 1, 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (83, 'Investigative Report', 'image11.jpg', '2024-03-29', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (84, 'Feature Story', 'image12.jpg', '2024-03-28', 1, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (85, 'Behind the Scenes', 'image13.jpg', '2024-03-27', 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (86, 'Exclusive Coverage', 'image14.jpg', '2024-03-26', 1, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (87, 'Special Edition', 'image15.jpg', '2024-03-25', 1, 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (88, 'Breaking News 1', 'image1.jpg', '2024-04-08', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (14, 'ABC2', 'https://cdn.onemars.net/sites/perfect-fit_pl_W7ZCj_JAs8/image/large_kot-nie-chce-jeoe-mokrej-karmy-sprawdc-czy-powinieneo-si-r-przejmowae_1637151639646_1686300799201.png', '2024-04-12', 1, 'ABC3', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (57, 'asdad', 'saddaas', '2024-04-11', 1, 'asdsaa', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (58, 'Breaking News 1', 'image1.jpg', '2024-04-08', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (59, 'Latest Update', 'image2.jpg', '2024-04-07', 2, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (60, 'Important Announcement', 'image3.jpg', '2024-04-06', 3, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (61, 'Exclusive Interview', 'image4.jpg', '2024-04-05', 4, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (62, 'Top Story of the Day', 'image5.jpg', '2024-04-04', 1, 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (63, 'Special Report', 'image6.jpg', '2024-04-03', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (64, 'Exclusive Coverage', 'image7.jpg', '2024-04-02', 1, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (65, 'In-depth Analysis', 'image8.jpg', '2024-04-01', 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (66, 'Breaking News Alert', 'image9.jpg', '2024-03-31', 1, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (67, 'Live Updates', 'image10.jpg', '2024-03-30', 1, 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (68, 'Investigative Report', 'image11.jpg', '2024-03-29', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (69, 'Feature Story', 'image12.jpg', '2024-03-28', 1, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (70, 'Behind the Scenes', 'image13.jpg', '2024-03-27', 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (71, 'Exclusive Coverage', 'image14.jpg', '2024-03-26', 1, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (72, 'Special Edition', 'image15.jpg', '2024-03-25', 1, 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (74, 'Latest Update', 'image2.jpg', '2024-04-07', 2, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (75, 'Important Announcement', 'image3.jpg', '2024-04-06', 3, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (76, 'Exclusive Interview', 'image4.jpg', '2024-04-05', 4, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (77, 'Top Story of the Day', 'image5.jpg', '2024-04-04', 1, 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (78, 'Special Report', 'image6.jpg', '2024-04-03', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (79, 'Exclusive Coverage', 'image7.jpg', '2024-04-02', 1, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', false);
INSERT INTO public.news OVERRIDING SYSTEM VALUE VALUES (73, 'Breaking News 1', 'image1.jpg', '2024-04-08', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', true);


--
-- TOC entry 3482 (class 0 OID 73763)
-- Dependencies: 222
-- Data for Name: registrationforcompetition; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3498 (class 0 OID 82018)
-- Dependencies: 238
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3499 (class 0 OID 82043)
-- Dependencies: 239
-- Data for Name: score; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3489 (class 0 OID 81942)
-- Dependencies: 229
-- Data for Name: track; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3496 (class 0 OID 81982)
-- Dependencies: 236
-- Data for Name: trackreservation; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3497 (class 0 OID 81998)
-- Dependencies: 237
-- Data for Name: tracktype; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3502 (class 0 OID 90118)
-- Dependencies: 242
-- Data for Name: trainer; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3480 (class 0 OID 73751)
-- Dependencies: 220
-- Data for Name: userrole; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3478 (class 0 OID 73729)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--

INSERT INTO public.users VALUES (1, 'John', 'Doe', 'hashed_password123', 'john.doe@example.com', '1990-05-15', false);
INSERT INTO public.users VALUES (2, 'Jane', 'Smith', 'hashed_password456', 'jane.smith@example.com', '1985-09-28', true);
INSERT INTO public.users VALUES (3, 'Michael', 'Johnson', 'hashed_password789', 'michael.johnson@example.com', '1988-12-10', false);
INSERT INTO public.users VALUES (4, 'Sarah', 'Brown', 'hashed_passwordabc', 'sarah.brown@example.com', '1995-03-20', true);


--
-- TOC entry 3492 (class 0 OID 81959)
-- Dependencies: 232
-- Data for Name: weapon; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--

INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (1, 'M4 Carbine', 50, 100, true, '$50.00', false, 'M4-1234');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (2, 'Glock 17', 20, 150, true, '$30.00', false, 'G17-5678');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (3, 'M249 SAW', 80, 120, true, '$100.00', false, 'SAW-91011');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (4, 'M240B', 10, 200, true, '$120.00', false, 'M240B-121314');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (5, 'M1911', 90, 80, true, '$25.00', false, 'M1911-151617');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (6, 'Remington 870', 30, 150, true, '$40.00', false, 'R870-181920');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (7, 'Barrett M82', 70, 100, true, '$200.00', false, 'M82-212223');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (8, 'MP5', 40, 130, true, '$60.00', false, 'MP5-242526');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (9, 'M16', 60, 110, true, '$70.00', false, 'M16-272829');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (10, 'AK-47', 25, 90, true, '$40.00', false, 'AK47-303132');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (11, 'FN SCAR', 70, 140, true, '$150.00', false, 'SCAR-313233');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (12, 'Beretta M9', 15, 170, true, '$35.00', false, 'M9-343536');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (13, 'S&W M&P', 85, 100, true, '$30.00', false, 'M&P-373839');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (14, 'SIG Sauer P226', 35, 120, true, '$40.00', false, 'P226-404142');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (15, 'FN P90', 45, 130, true, '$75.00', false, 'P90-434445');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (16, 'Heckler & Koch UMP', 65, 110, true, '$55.00', false, 'UMP-464748');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (17, 'Steyr AUG', 55, 90, true, '$80.00', false, 'AUG-495051');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (18, 'Mossberg 500', 5, 160, true, '$35.00', false, 'M500-525354');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (19, 'Benelli M4', 75, 100, true, '$70.00', false, 'M4-555657');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (20, 'H&K G36', 20, 130, true, '$90.00', false, 'G36-585960');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (21, 'Desert Eagle', 30, 150, true, '$100.00', false, 'DE-616263');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (22, 'FN F2000', 10, 100, true, '$120.00', false, 'F2000-646566');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (23, 'Ruger SR9', 50, 110, true, '$40.00', false, 'SR9-676869');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (24, 'Mossberg 590', 40, 80, true, '$45.00', false, 'M590-707172');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (25, 'Colt Python', 60, 140, true, '$60.00', false, 'Python-737475');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (26, 'Springfield XD', 25, 170, true, '$35.00', false, 'XD-767778');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (27, 'H&K USP', 35, 120, true, '$50.00', false, 'USP-798081');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (28, 'Beretta 92', 45, 130, true, '$40.00', false, 'B92-828384');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (29, 'Ruger LC9', 15, 150, true, '$30.00', false, 'LC9-858687');
INSERT INTO public.weapon OVERRIDING SYSTEM VALUE VALUES (30, 'Kel-Tec PMR-30', 55, 100, true, '$25.00', false, 'PMR30-888990');


--
-- TOC entry 3491 (class 0 OID 81953)
-- Dependencies: 231
-- Data for Name: weaponreservation; Type: TABLE DATA; Schema: public; Owner: strzelnica_db_owner
--



--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 223
-- Name: competitions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.competitions_id_seq', 1, false);


--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 233
-- Name: competitionweapons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.competitionweapons_id_seq', 1, false);


--
-- TOC entry 3524 (class 0 OID 0)
-- Dependencies: 225
-- Name: course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.course_id_seq', 1, false);


--
-- TOC entry 3525 (class 0 OID 0)
-- Dependencies: 227
-- Name: courseuser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.courseuser_id_seq', 1, false);


--
-- TOC entry 3526 (class 0 OID 0)
-- Dependencies: 230
-- Name: gunreservations_type_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.gunreservations_type_seq', 1, false);


--
-- TOC entry 3527 (class 0 OID 0)
-- Dependencies: 215
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.news_id_seq', 102, true);


--
-- TOC entry 3528 (class 0 OID 0)
-- Dependencies: 221
-- Name: registrationforcompetitions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.registrationforcompetitions_id_seq', 1, false);


--
-- TOC entry 3529 (class 0 OID 0)
-- Dependencies: 235
-- Name: trackreservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.trackreservation_id_seq', 1, false);


--
-- TOC entry 3530 (class 0 OID 0)
-- Dependencies: 241
-- Name: trainer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.trainer_id_seq', 1, false);


--
-- TOC entry 3531 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- TOC entry 3532 (class 0 OID 0)
-- Dependencies: 219
-- Name: userroles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.userroles_id_seq', 1, false);


--
-- TOC entry 3533 (class 0 OID 0)
-- Dependencies: 243
-- Name: weapon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strzelnica_db_owner
--

SELECT pg_catalog.setval('public.weapon_id_seq', 1, false);


--
-- TOC entry 3289 (class 2606 OID 73777)
-- Name: competition competitions_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.competition
    ADD CONSTRAINT competitions_pkey PRIMARY KEY (id);


--
-- TOC entry 3301 (class 2606 OID 81975)
-- Name: competitionweapon competitionweapons_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.competitionweapon
    ADD CONSTRAINT competitionweapons_pkey PRIMARY KEY (id);


--
-- TOC entry 3291 (class 2606 OID 81926)
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);


--
-- TOC entry 3293 (class 2606 OID 81934)
-- Name: courseuser courseuser_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.courseuser
    ADD CONSTRAINT courseuser_pkey PRIMARY KEY (id);


--
-- TOC entry 3297 (class 2606 OID 81958)
-- Name: weaponreservation gunreservations_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.weaponreservation
    ADD CONSTRAINT gunreservations_pkey PRIMARY KEY (id);


--
-- TOC entry 3311 (class 2606 OID 82093)
-- Name: leaderboard leaderboard_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.leaderboard
    ADD CONSTRAINT leaderboard_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3281 (class 2606 OID 49183)
-- Name: news news_pk; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pk PRIMARY KEY (id);


--
-- TOC entry 3287 (class 2606 OID 73768)
-- Name: registrationforcompetition registrationforcompetitions_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.registrationforcompetition
    ADD CONSTRAINT registrationforcompetitions_pkey PRIMARY KEY (id);


--
-- TOC entry 3307 (class 2606 OID 82022)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 3309 (class 2606 OID 82047)
-- Name: score score_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_pkey PRIMARY KEY (id);


--
-- TOC entry 3295 (class 2606 OID 81946)
-- Name: track track_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT track_pkey PRIMARY KEY (id);


--
-- TOC entry 3303 (class 2606 OID 81987)
-- Name: trackreservation trackreservation_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.trackreservation
    ADD CONSTRAINT trackreservation_pkey PRIMARY KEY (id);


--
-- TOC entry 3305 (class 2606 OID 82002)
-- Name: tracktype tracktype_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.tracktype
    ADD CONSTRAINT tracktype_pkey PRIMARY KEY (id);


--
-- TOC entry 3313 (class 2606 OID 90123)
-- Name: trainer trainer_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.trainer
    ADD CONSTRAINT trainer_pkey PRIMARY KEY (id);


--
-- TOC entry 3283 (class 2606 OID 90152)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3285 (class 2606 OID 73756)
-- Name: userrole userroles_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.userrole
    ADD CONSTRAINT userroles_pkey PRIMARY KEY (id);


--
-- TOC entry 3299 (class 2606 OID 81963)
-- Name: weapon weapons_pkey; Type: CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.weapon
    ADD CONSTRAINT weapons_pkey PRIMARY KEY (id);


--
-- TOC entry 3314 (class 2606 OID 90153)
-- Name: news author_id_FK; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "author_id_FK" FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- TOC entry 3324 (class 2606 OID 82073)
-- Name: competitionweapon competitionweapons_competition_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.competitionweapon
    ADD CONSTRAINT competitionweapons_competition_fk FOREIGN KEY (competition_id) REFERENCES public.competition(id);


--
-- TOC entry 3325 (class 2606 OID 82078)
-- Name: competitionweapon competitionweapons_weapon_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.competitionweapon
    ADD CONSTRAINT competitionweapons_weapon_fk FOREIGN KEY (weapon_id) REFERENCES public.weapon(id);


--
-- TOC entry 3319 (class 2606 OID 82013)
-- Name: courseuser courseuser_course_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.courseuser
    ADD CONSTRAINT courseuser_course_fk FOREIGN KEY (course_id) REFERENCES public.course(id);


--
-- TOC entry 3320 (class 2606 OID 90163)
-- Name: courseuser courseuser_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.courseuser
    ADD CONSTRAINT courseuser_user_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3329 (class 2606 OID 90188)
-- Name: leaderboard leaderboard_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.leaderboard
    ADD CONSTRAINT leaderboard_user_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3317 (class 2606 OID 82038)
-- Name: registrationforcompetition registrationforcompetition_competition_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.registrationforcompetition
    ADD CONSTRAINT registrationforcompetition_competition_fk FOREIGN KEY (competition_id) REFERENCES public.competition(id);


--
-- TOC entry 3318 (class 2606 OID 90173)
-- Name: registrationforcompetition registrationforcompetition_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.registrationforcompetition
    ADD CONSTRAINT registrationforcompetition_user_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3328 (class 2606 OID 82048)
-- Name: score score_competition_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_competition_fk FOREIGN KEY (competition_id) REFERENCES public.competition(id);


--
-- TOC entry 3321 (class 2606 OID 82003)
-- Name: track track_tracktype_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT track_tracktype_fk FOREIGN KEY (type_id) REFERENCES public.tracktype(id);


--
-- TOC entry 3326 (class 2606 OID 81993)
-- Name: trackreservation trackreservation_track_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.trackreservation
    ADD CONSTRAINT trackreservation_track_fk FOREIGN KEY (track_id) REFERENCES public.track(id);


--
-- TOC entry 3327 (class 2606 OID 90158)
-- Name: trackreservation trackreservation_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.trackreservation
    ADD CONSTRAINT trackreservation_user_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3330 (class 2606 OID 90124)
-- Name: trainer trainer_course_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.trainer
    ADD CONSTRAINT trainer_course_fk FOREIGN KEY (course_id) REFERENCES public.course(id);


--
-- TOC entry 3331 (class 2606 OID 90183)
-- Name: trainer trainer_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.trainer
    ADD CONSTRAINT trainer_user_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3315 (class 2606 OID 82023)
-- Name: userrole userrole_role_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.userrole
    ADD CONSTRAINT userrole_role_fk FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- TOC entry 3316 (class 2606 OID 90168)
-- Name: userrole userrole_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.userrole
    ADD CONSTRAINT userrole_user_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3322 (class 2606 OID 90178)
-- Name: weaponreservation weaponreservations_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.weaponreservation
    ADD CONSTRAINT weaponreservations_user_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3323 (class 2606 OID 82053)
-- Name: weaponreservation weaponreservations_weapon_fk; Type: FK CONSTRAINT; Schema: public; Owner: strzelnica_db_owner
--

ALTER TABLE ONLY public.weaponreservation
    ADD CONSTRAINT weaponreservations_weapon_fk FOREIGN KEY (weapon_id) REFERENCES public.weapon(id);


--
-- TOC entry 3510 (class 0 OID 0)
-- Dependencies: 3509
-- Name: DATABASE strzelnica_db; Type: ACL; Schema: -; Owner: strzelnica_db_owner
--

GRANT ALL ON DATABASE strzelnica_db TO neon_superuser;


--
-- TOC entry 2114 (class 826 OID 32769)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2113 (class 826 OID 32768)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2024-04-13 20:15:41

--
-- PostgreSQL database dump complete
--

