CREATE DATABASE IF NOT EXISTS chuanyunjian CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE chuanyunjian;

DROP TABLE IF EXISTS demand_tag;
DROP TABLE IF EXISTS demand;
DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS user_tag;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    longitude DECIMAL(10,7),
    latitude DECIMAL(10,7),
    online_status TINYINT DEFAULT 0,
    credit_score INT DEFAULT 80,
    avg_response_minutes INT DEFAULT 10,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tag (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    parent_id BIGINT DEFAULT 0,
    category VARCHAR(20) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_tag (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    UNIQUE KEY uk_user_tag(user_id, tag_id)
);

CREATE TABLE card (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    core_tag_id BIGINT,
    tag_ids VARCHAR(500),
    share_count INT DEFAULT 0,
    share_limit INT DEFAULT 3,
    unlocked TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE demand (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    budget DECIMAL(10,2),
    urgency VARCHAR(20) NOT NULL,
    longitude DECIMAL(10,7),
    latitude DECIMAL(10,7),
    address VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE demand_tag (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    demand_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    UNIQUE KEY uk_demand_tag(demand_id, tag_id)
);
