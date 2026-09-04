USE chuanyunjian;

-- 标签数据
INSERT INTO tag (id, name, parent_id, category) VALUES
(1, '汽车维修', 0, 'skill'),
(2, '电瓶更换', 1, 'skill'),
(3, '轮胎修补', 1, 'skill'),
(4, '发动机维修', 1, 'skill'),
(5, '汽车保养', 0, 'skill'),
(6, '家政服务', 0, 'skill'),
(7, '保洁', 6, 'skill'),
(8, '搬家', 6, 'skill'),
(9, 'Java开发', 0, 'skill'),
(10, 'React开发', 0, 'skill'),
(11, '后端开发', 0, 'skill');

-- 技能方用户数据（深圳南山区附近）
-- 需求中心坐标：22.5333, 113.9304
INSERT INTO user (id, name, longitude, latitude, online_status, credit_score, avg_response_minutes) VALUES
(1, '李师傅', 113.9304, 22.5405, 1, 95, 3),
(2, '王师傅', 113.9441, 22.5333, 1, 91, 5),
(3, '张师傅', 113.9304, 22.5135, 0, 88, 8),
(4, '赵师傅', 113.9031, 22.5333, 1, 90, 6),
(5, '陈师傅', 113.9304, 22.5738, 1, 94, 4),
(6, '程序员李工', 113.9900, 22.5500, 1, 93, 7);

-- 用户标签关联
INSERT INTO user_tag (user_id, tag_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 3),
(3, 1),
(4, 5),
(5, 1), (5, 4),
(6, 9), (6, 11);
