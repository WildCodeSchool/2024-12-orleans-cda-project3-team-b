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
  ('Amateur', 0.1),
  ('Regional Artist', 0.2),
  ('National Star', 0.3),
  ('International Star', 0.4),
  ('Icon', 0);


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
('Kris','Browne',null,4.5,5,4,9750000,"kris-browne.jpeg",480),
('Ed','Sheern',null,4,6,4,1000000,"ed-sheern.jpeg",500)
;



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
('Advertsise on a billboard',8,85000,'billboard.jpg',80),
('Advertise on TV',10,100000,'tv.jpg',100);

INSERT INTO artists_skills (artists_id, skills_id, grade)
VALUES 
(1, 1, 23),
(1, 2, 23),
(1, 3, 23),
(1, 4, 23),
(2, 1, 23),
(2, 2, 23),
(2, 3, 23),
(2, 4, 23),
(3, 1, 23),
(3, 2, 23),
(3, 3, 23),
(3, 4, 23),
(4, 1, 23),
(4, 2, 23),
(4, 3, 23),
(4, 4, 23),
(5, 1, 23),
(5, 2, 23),
(5, 3, 23),
(5, 4, 23);


