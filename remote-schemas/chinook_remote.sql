-- ----------------------------
-- Sequence structure for playlist_playlist_id_seq
-- ----------------------------
CREATE SEQUENCE "playlist_playlist_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 2147483647
 START 18
 CACHE 1;
SELECT setval('"public"."playlist_playlist_id_seq"', 18, true);

CREATE TABLE playlist_track
(
    playlist_id INT NOT NULL,
    track_id INT NOT NULL,
    CONSTRAINT pk_playlist_track PRIMARY KEY  (playlist_id, track_id)
);

CREATE TABLE playlist
(
    playlist_id int DEFAULT nextval('playlist_playlist_id_seq'::regclass) NOT NULL,
    name VARCHAR(120),
    CONSTRAINT pk_playlist PRIMARY KEY  (playlist_id)
);

ALTER TABLE playlist_track ADD CONSTRAINT fk_playlist_track_playlist_id
    FOREIGN KEY (playlist_id) REFERENCES playlist (playlist_id) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ALTER TABLE playlist_track ADD CONSTRAINT fk_playlist_track_track_id
--     FOREIGN KEY (track_id) REFERENCES track (track_id) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE INDEX ifk_playlist_track_track_id ON playlist_track (track_id);

/*******************************************************************************
   Populate Tables
********************************************************************************/

INSERT INTO playlist (playlist_id, name) VALUES (1, N'Music');
INSERT INTO playlist (playlist_id, name) VALUES (2, N'Movies');
INSERT INTO playlist (playlist_id, name) VALUES (3, N'TV Shows');
INSERT INTO playlist (playlist_id, name) VALUES (4, N'Audiobooks');
INSERT INTO playlist (playlist_id, name) VALUES (5, N'90’s Music');
INSERT INTO playlist (playlist_id, name) VALUES (6, N'Audiobooks');
INSERT INTO playlist (playlist_id, name) VALUES (7, N'Movies');
INSERT INTO playlist (playlist_id, name) VALUES (8, N'Music');
INSERT INTO playlist (playlist_id, name) VALUES (9, N'Music Videos');
INSERT INTO playlist (playlist_id, name) VALUES (10, N'TV Shows');
INSERT INTO playlist (playlist_id, name) VALUES (11, N'Brazilian Music');
INSERT INTO playlist (playlist_id, name) VALUES (12, N'Classical');
INSERT INTO playlist (playlist_id, name) VALUES (13, N'Classical 101 - Deep Cuts');
INSERT INTO playlist (playlist_id, name) VALUES (14, N'Classical 101 - Next Steps');
INSERT INTO playlist (playlist_id, name) VALUES (15, N'Classical 101 - The Basics');
INSERT INTO playlist (playlist_id, name) VALUES (16, N'Grunge');
INSERT INTO playlist (playlist_id, name) VALUES (17, N'Heavy Metal Classic');
INSERT INTO playlist (playlist_id, name) VALUES (18, N'On-The-Go 1');
