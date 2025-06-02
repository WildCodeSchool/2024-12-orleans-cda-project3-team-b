INSERT INTO levels (value) 
VALUES
  (0), (50), (500), (1000), (1500),
  (3000), (5000), (7000), (9000), (11000),
  (15000), (20000), (25000), ( 30000), (35000),
  (40000), (48000), (56000), (70000), ( 100000);

INSERT INTO logos (logo_img)
VALUES 
('mic.png'),
('music.png'),
('orange.png'),
('sound.png'),
('color.png');


INSERT INTO milestones (name, value)
VALUES
  ('Amateur', 10),
  ('Regional Artist', 20),
  ('National Star', 30),
  ('International Star', 40),
  ('Icon', 50);


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
('Kairo','Blackwale',null,1,1,1,30000,"kairo-blackwale.png",25),
(NULL,Null,'Milo',0.8,6,1,20000,"milo.png",15),
('Nova','Khaos',null,0.6,7,1,15000,"nova-khaos.jpg",15),
('Yuna','Voltage',null,2,3,2,60000,"yuna-voltage.png",40),
(null,null,'Zaria',0.7,4,1,15000,"zaria.jpg",15),
('Ed','Sheern',null,4,5,4,900000,"ed-sheern.jpeg",500),
('Al','Hassane',null,1,2,1,10000,"al-hassane.jpg",10);



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
('Vocal coach',6,60000,'vocal-coach.jpg',30);

INSERT INTO marketing (name,bonus,price,image,exp_value)
VALUES 
('Post on social medias',2,30000,'socialmedia.jpg',15),
('Post on Utube ',3,40000,'utube.jpg',30),
('Post on MusicLoud',5,60000,'musicloud.jpg',45),
('Advertsise on a billboard',8,85000,'billboard.jpg',80),
('Advertise on TV',10,100000,'tv.jpg',100);

INSERT INTO artists_skills (artists_id, skills_id, grade)
VALUES 
(1, 1,23),
(1, 2, 24),
(1, 3, 22),
(1, 4, 24),
(2, 1, 25),
(2, 2, 25),
(2, 3, 25),
(2, 4, 25),
(3, 1, 23),
(3, 2, 22),
(3, 3, 21),
(3, 4, 25),
(4, 1, 23),
(4, 2, 23),
(4, 3, 22),
(4, 4, 24),
(5, 1, 19),
(5, 2, 24),
(5, 3, 24),
(5, 4, 25),
(6, 1, 12),
(6, 2, 11),
(6, 3, 12),
(6, 4, 12),
(7, 1, 8),
(7, 2, 8),
(7, 3, 10),
(7, 4, 12),
(8, 1, 19),
(8, 2, 20),
(8, 3, 18),
(8, 4, 22),
(9, 1, 21),
(9, 2, 18),
(9, 3, 18),
(9, 4, 20),
(10, 1, 22),
(10, 2, 22),
(10, 3, 22),
(10, 4, 23),
(11, 1, 23),
(11, 2, 23),
(11, 3, 23),
(11, 4, 24),
(12, 1, 23),
(12, 2, 23),
(12, 3, 23),
(12, 4, 21),
(13, 1, 5),
(13, 2, 6),
(13, 3, 4),
(13, 4, 3),
(14, 1, 4),
(14, 2, 4),
(14, 3, 4),
(14, 4, 5),
(15, 1, 4),
(15, 2, 4),
(15, 3, 4),
(15, 4, 3),
(16, 1, 7),
(16, 2, 8),
(16, 3, 7),
(16, 4, 8),
(17, 1, 7),
(17, 2, 5),
(17, 3, 5),
(17, 4, 4),
(18, 1, 23),
(18, 2, 23),
(18, 3, 23),
(18, 4, 23),
(19, 1, 1),
(19, 2, 1),
(19, 3, 1),
(19, 4, 1);













