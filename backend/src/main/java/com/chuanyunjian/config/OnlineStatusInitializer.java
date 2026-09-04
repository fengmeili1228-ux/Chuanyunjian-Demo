package com.chuanyunjian.config;

import com.chuanyunjian.entity.User;
import com.chuanyunjian.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class OnlineStatusInitializer {

    private final StringRedisTemplate redisTemplate;
    private final UserService userService;

    public OnlineStatusInitializer(StringRedisTemplate redisTemplate, UserService userService) {
        this.redisTemplate = redisTemplate;
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        try {
            List<User> onlineUsers = userService.lambdaQuery().eq(User::getOnlineStatus, 1).list();
            for (User user : onlineUsers) {
                String key = "user:online:" + user.getId();
                redisTemplate.opsForValue().set(key, "1", 60, TimeUnit.SECONDS);
            }
        } catch (Exception e) {
            // Redis 未启动时不影响主流程
        }
    }
}
