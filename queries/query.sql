-- Drop Database
drop database if exists "User_Score_Emotion_DB";

-- Create Database
create database "User_Score_Emotion_DB";

-- Create Table
create table if not exists "Users" (
	"id" SERIAL primary key,
	"name" VARCHAR(100) not null,
	"score" INT not null,
	"emotion" VARCHAR(50) not null,
	"createdAt" TIMESTAMP not null default NOW()
);

-- Create (Insert) Data
insert into "Users" ("name", "score", "emotion", "createdAt")
	values
	('Kevin', 80, 'Happy', '2020/02/20'),
	('Josh', 90, 'Sad', '2020/02/20'),
	('Kevin', 85, 'Happy', '2020/02/20'),
	('Kevin', 75, 'Sad', '2020/02/20'),
	('Josh', 65, 'Angry', '2020/02/20'),
	('David', 85, 'Happy', '2020/02/21'),
	('Josh', 90, 'Sad', '2020/02/21'),
	('David', 75, 'Sad', '2020/02/21'),
	('Josh', 85, 'Sad', '2020/02/21'),
	('Josh', 70, 'Happy', '2020/02/21'),
	('Kevin', 80, 'Sad', '2020/02/21'),
	('Kevin', 73, 'Sad', '2020/02/22'),
	('Kevin', 75, 'Angry', '2020/02/22'),
	('David', 82, 'Sad', '2020/02/22'),
	('David', 65, 'Sad', '2020/02/22')
	returning *;

-- Read (Select) average score data for each name
select name, avg("score") from "Users"
	group by name;

-- Read (Select) modus emotion data for each name
with "Emotion_Mode" as (
	select name, "emotion", count("emotion") as "frequency",
		rank() over (partition by name order by count("emotion") desc) as "rank"
		from "Users"
		group by name, "emotion"
		order by name, "frequency" desc
)
select name, "emotion", "frequency", "rank" from "Emotion_Mode"
	where "rank" = 1;

-- Read (Select) average score data for each name with same date
-- Day 20
select name, avg("score") from "Users"
	where date_part('day', "createdAt") = 20
	group by name;

-- Day 21
select name, avg("score") from "Users"
	where date_part('day', "createdAt") = 21
	group by name;

-- Day 22
select name, avg("score") from "Users"
	where date_part('day', "createdAt") = 22
	group by name;

-- Read (Select) modus emotion data for each name with same date
-- Day 20
with "Emotion_Mode" as (
	select name, "emotion", count("emotion") as "frequency",
		rank() over (partition by name order by count("emotion") desc) as "rank"
		from "Users"
		where date_part('day', "createdAt") = 20
		group by name, "emotion"
		order by name, "frequency" desc
)
select name, "emotion", "frequency", "rank" from "Emotion_Mode"
	where "rank" = 1;

-- Day 21
with "Emotion_Mode" as (
	select name, "emotion", count("emotion") as "frequency",
		rank() over (partition by name order by count("emotion") desc) as "rank"
		from "Users"
		where date_part('day', "createdAt") = 21
		group by name, "emotion"
		order by name, "frequency" desc
)
select name, "emotion", "frequency", "rank" from "Emotion_Mode"
	where "rank" = 1;

-- Day 22
with "Emotion_Mode" as (
	select name, "emotion", count("emotion") as "frequency",
		rank() over (partition by name order by count("emotion") desc) as "rank"
		from "Users"
		where date_part('day', "createdAt") = 22
		group by name, "emotion"
		order by name, "frequency" desc
)
select name, "emotion", "frequency", "rank" from "Emotion_Mode"
	where "rank" = 1;
