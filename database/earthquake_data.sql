toc.dat                                                                                             0000600 0004000 0002000 00000002637 14453340223 0014447 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP                           {            earthquake_data    15.3    15.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    16398    earthquake_data    DATABASE     �   CREATE DATABASE earthquake_data WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE earthquake_data;
                postgres    false         �            1259    16399    earthquakes    TABLE     �   CREATE TABLE public.earthquakes (
    datetime timestamp without time zone,
    region text,
    magnitude double precision,
    latitude double precision,
    longitude double precision
);
    DROP TABLE public.earthquakes;
       public         heap    postgres    false         �          0    16399    earthquakes 
   TABLE DATA           W   COPY public.earthquakes (datetime, region, magnitude, latitude, longitude) FROM stdin;
    public          postgres    false    214       3314.dat                                                                                                 3314.dat                                                                                            0000600 0004000 0002000 00000002510 14453340223 0014242 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2023-07-10 02:18:18	Pusat gempa berada di laut 88 Km Baratdaya Kabupaten Bandung	4	7.77	107.26
2023-07-10 01:19:04	Pusat gempa berada di laut 63 km Barat Daya Meulaboh	5.2	3.65	95.84
2023-07-09 14:09:06	Pusat gempa berada di laut 64 km Baratdaya Banda Aceh	5.5	5.38	94.77
2023-07-09 09:44:16	Pusat gempa berada di darat 16 km Baratlaut Buol	4.9	1.1	121.28
2023-07-09 00:35:10	Pusat gempa berada di darat 5km Timur Laut Siddenreng Rappang	4.7	3.77	120.07
2023-07-07 04:25:08	Pusat gempa berada di laut 42 km BaratLaut Kab. Jayapura	5	2.4	140.07
2023-07-06 17:13:19	Pusat gempa berada di laut 207km BaratLaut Tanimbar	6	7.17	129.62
2023-07-05 21:43:22	Pusat gempa berada di darat 102 km TimurLaut Pontianak	2.6	0.62	110
2023-07-05 07:31:29	Pusat gempa berada di darat 37 Km BaratLaut Luwu Timur	4.5	2.41	120.88
2023-07-04 13:57:01	Pusat gempa berada di darat 14 km BaratDaya Bengkulu Tengah	3.7	3.87	102.38
2023-07-03 02:51:38	Pusat gempa berada di darat 69 km Barat Daya Keerom	6.2	3.71	140.25
2023-07-02 17:13:11	Pusat gempa berada di darat 9 km timur Morowali Utara	3	1.99	121.42
2023-07-02 11:40:28	Pusat gempa berada di darat 43 km BaratDaya Ransiki	4.5	1.74	133.87
2023-07-02 00:57:11	Pusat gempa berada di laut 33 km BaratLaut Lombok Barat	3.3	8.55	115.87
2023-07-01 18:44:18	Pusat gempa berada di laut 71 km Timur Laut Sumbawa	5	7.89	117.66
\.


                                                                                                                                                                                        restore.sql                                                                                         0000600 0004000 0002000 00000003673 14453340223 0015375 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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

DROP DATABASE earthquake_data;
--
-- Name: earthquake_data; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE earthquake_data WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE earthquake_data OWNER TO postgres;

\connect earthquake_data

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
-- Name: earthquakes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.earthquakes (
    datetime timestamp without time zone,
    region text,
    magnitude double precision,
    latitude double precision,
    longitude double precision
);


ALTER TABLE public.earthquakes OWNER TO postgres;

--
-- Data for Name: earthquakes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.earthquakes (datetime, region, magnitude, latitude, longitude) FROM stdin;
\.
COPY public.earthquakes (datetime, region, magnitude, latitude, longitude) FROM '$$PATH$$/3314.dat';

--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     