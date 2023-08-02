create database clone_mochimochi;

CREATE TABLE users (
    userId VARCHAR(36) NOT NULL,
    userName VARCHAR(225) NOT NULL,
    email VARCHAR(225) NOT NULL,
    `password` LONGTEXT,
    experience INT NOT NULL,
    trophy VARCHAR(225) NOT NULL,
    `role` TINYINT,
    photoURL LONGTEXT NOT NULL,
    PRIMARY KEY (userId)
);

SELECT * FROM users WHERE email = "kethanlinh.otaku@gmail.com";


SELECT 
    *
FROM
    users;

CREATE TABLE courses (
    courseId INT NOT NULL,
    courseName VARCHAR(225) NOT NULL,
    courseLangue TINYINT NOT NULL,
    target VARCHAR(225) NOT NULL,
    about VARCHAR(225) NOT NULL,
    PRIMARY KEY (courseId)
);
-- courseLangue: 1: english, 2: japanese

CREATE TABLE lessons (
    lessonId INT NOT NULL,
    courseId INT NOT NULL,
    lessonName VARCHAR(225) NOT NULL,
    lessonSubName VARCHAR(225) NOT NULL,
    lessonImg LONGTEXT NOT NULL,
    PRIMARY KEY (lessonId),
    FOREIGN KEY (courseId)
        REFERENCES courses (courseId)
);
SELECT * FROM lessons WHERE courseId = 1;

CREATE TABLE lessons_complete (
    completeId INT NOT NULL,
    lessonId INT NOT NULL,
    userId VARCHAR(36) NOT NULL,
    PRIMARY KEY (completeId),
    FOREIGN KEY (lessonId)
        REFERENCES lessons (lessonId),
    FOREIGN KEY (userId)
        REFERENCES users (userId)
);

CREATE TABLE new_words (
    newWordId INT NOT NULL,
    lessonId INT NOT NULL,
    title VARCHAR(225) NOT NULL,
    contentOne VARCHAR(225) NOT NULL,
    contentTwo VARCHAR(225),
    pronound VARCHAR(225) NOT NULL,
    translate VARCHAR(225) NOT NULL,
    newWordImg LONGTEXT NOT NULL,
    voice LONGTEXT NOT NULL,
    PRIMARY KEY (newWordId),
    FOREIGN KEY (lessonId)
        REFERENCES lessons (lessonId)
);

CREATE TABLE test_tables (
    testTableId INT NOT NULL,
    testTableName VARCHAR(225) NOT NULL,
    testTableType TINYINT NOT NULL,
    PRIMARY KEY (testTableId)
);

-- testTableType: 1: vocabulary, 2: listening, 3: reading


CREATE TABLE tests (
    testId INT NOT NULL,
    testName VARCHAR(225) NOT NULL,
    testTableId INT NOT NULL,
    PRIMARY KEY (testId),
    FOREIGN KEY (testTableId)
        REFERENCES test_tables (testTableId)
);

CREATE TABLE test_exs (
    exId INT NOT NULL,
    question LONGTEXT NOT NULL,
    answerOne VARCHAR(225) NOT NULL,
    answerTwo VARCHAR(225) NOT NULL,
    answerThree VARCHAR(225) NOT NULL,
    answerFour VARCHAR(225),
    rightAnswer VARCHAR(225) NOT NULL,
    testId INT NOT NULL,
    PRIMARY KEY (exId),
    FOREIGN KEY (testId)
        REFERENCES tests (testId)
);

CREATE TABLE notes (
    noteId INT NOT NULL,
    userId VARCHAR(36) NOT NULL,
    content LONGTEXT NOT NULL,
    complete INT,
    PRIMARY KEY (noteId),
    FOREIGN KEY (userId)
        REFERENCES users (userId)
);







