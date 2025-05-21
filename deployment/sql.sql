INSERT INTO levels (value) 
VALUES
  (0), (100), (300), (600), (1 000),
  (2 500), (5 000), (10 000), (20 000), (40 000),
  (80 000), (150 000), (300 000), (600 000), (1 200 000),
  (2 500 000), (5 000 000), (10 000 000), (20 000 000), ( 50 000 000);

INSERT INTO logos (logo_img)
VALUES 
('mic.png'),
('music.png'),
('orange.png'),
('sound.png'),
('color.png');


INSERT INTO milestones (name, value)
VALUES
  ('Amateur', 1),
  ('Regional Artist', 2),
  ('National Star', 3),
  ('International Star', 4),
  ('Icon', 5);


INSERT INTO skills (name,exp_value )
VALUES 
('Singing',30),
('Charisma',30),
('Creativity',30),
('Talent',30);

INSERT INTO genres (name)
VALUES 
('Rock'),
('Jazz'),
('Électro'),
('Reggae'),
('Pop'),
('Rap'),
('R&B');

INSERT INTO artists (firstname,lastname,alias,notoriety,genres_id,milestones_id,price,image,exp_value)
VALUES 
('Pruno','Mars',null,4.6,5,4,1000000,"pruno-mars.jpeg",500),
('Michael','Jacksin',null,5,5,5,1200000,"michael-jacksin.jpeg",600),
(NULL,NULL,'Boyoncé',4.8,5,4,1150000,"boyonce.jpg",500),
(NULL,NULL,'Rohanna',4.8,5,4,1150000,"rohanna.jpeg",500),
(NULL,NULL,'Aminem',4.4,6,4,950000,"aminem.jpeg",400),
('Alex','Harper',null,3.7,1,3,200000,"alex-harper.jpeg",80),
('Tyler','Crow',null,3,3,3,100000,"tyler-crow.jpeg",70),
('Alicia','Kays',null,4,5,4,800000,"alicia-kays.jpeg",380),
('Mayley','Cyprus',null,4,5,4,800000,"mayley-cyprus.jpeg",480),
('Taylor','Switch',null,4.6,5,4,1000000,"taylo-switch.jpeg",480),
(NULL,NULL,'Droke',4.7,6,4,1100000,"droke.jpeg",490),
('Kris','Browne',null,4.5,5,4,97500000,"kris-browne.jpeg",480),
('Ed','Sheern',null,4,6,4,1000000,"ed-sheern.jpeg",500)
;

INSERT INTO artists_hired (artists_id,notoriety,milestones_id)
VALUES 
(1,4.6,4);

INSERT INTO singles (name,artists_hired_id,genres_id,score,listeners,money_earned,exp_value)
VALUES 
('24k',1,5,87,4000000,1300000,700),
('Finesse',1,5,80,3000000,1000000,600),
('Grenade',1,5,76,2000000,800000,500);

INSERT INTO albums (name,score,sales,money_earned,genres_id,exp_value ,artists_id)
VALUES 
('24K',88,5000000,15000000,5,1000,1);

INSERT INTO staff (job,bonus,price,image,exp_value)
VALUES 
('Community manager',3,30000,'community-manager.png',15),
('Marketing Director',6,60000,'marketing-director.png',30),
('Artistic director',6,60000,'artistic-director.png',30),
('CEO',8,100000,'ceo.png',60),
('Photograph',4,35000,'photograph.png',20),
('Sales director',7,80000,'sales-director.png',50);

INSERT INTO crew_members (job,bonus,price,image,exp_value)
VALUES
('Lyricist',3,30000,'lyricist.jpg',15),
('Music video director ',6,60000,'music-video-director.png',30),
('Composer',6,60000,'composer.jpg',30),
('Music producer',8,100000,'music-producer.png',60),
('Makeup artist',4,35000,'makeup-artist.png',20),
('Musician',7,80000,'musician.jpg',50),
('Vocal coach',6,60000,'vocal-coach.jpg',30)
;

INSERT INTO marketing (name,bonus,price,image,exp_value)
VALUES 
('Post on social medias',2,30000,'socialmedia.jpg',15),
('Post on Utube ',3,40000,'utube.jpg',30),
('Post on MusicLoud',5,60000,'musicloud.jpg',45),
('Music producer',7,70000,'music-producer.png',60),
('Advertsise on a billboard',8,85000,'billboard.jpg',80),
('Advertise on TV',10,100000,'tv.jpg',100);