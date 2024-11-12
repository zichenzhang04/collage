CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    pronouns VARCHAR(255),
    college VARCHAR(255),
    start_year INT,
    graduation_year INT,
    enrollment_date DATE,
    credits_completed INT,
    major VARCHAR(255),
    minor VARCHAR(255),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_img_url VARCHAR(255),
    schedule_ics_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    followers_count INT DEFAULT 0
);

CREATE TABLE instructors (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(256) NOT NULL,
    department VARCHAR(256) NOT NULL,
    email VARCHAR(256) UNIQUE
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(50) NOT NULL,
    credit_hours INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    instructor_id INT,
    topic_description TEXT NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    course_description TEXT NOT NULL,
    class_topic VARCHAR(255) NOT NULL,
    icon_url VARCHAR(255),
    FOREIGN KEY (instructor_id) REFERENCES instructors(instructor_id) ON DELETE SET NULL
);

CREATE TABLE tags (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE course_tags (
    course_id INT NOT NULL,
    tag_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (course_id, tag_id)
);

CREATE TABLE connections (
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    relationship ENUM('following', 'not-following', 'pending') DEFAULT 'not-following',
    PRIMARY KEY (follower_id, followed_id),
    FOREIGN KEY (follower_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE profileViewers (
    viewer_id INT NOT NULL,
    viewed_id INT NOT NULL,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (viewer_id, viewed_id),
    FOREIGN KEY (viewer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (viewed_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE saved_courses (
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, course_id)
);
