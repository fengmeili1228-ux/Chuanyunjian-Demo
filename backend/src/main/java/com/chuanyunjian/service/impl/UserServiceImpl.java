package com.chuanyunjian.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chuanyunjian.entity.Tag;
import com.chuanyunjian.entity.User;
import com.chuanyunjian.entity.UserTag;
import com.chuanyunjian.mapper.TagMapper;
import com.chuanyunjian.mapper.UserMapper;
import com.chuanyunjian.mapper.UserTagMapper;
import com.chuanyunjian.service.UserService;
import com.chuanyunjian.vo.TagVO;
import com.chuanyunjian.vo.UserVO;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    private final StringRedisTemplate redisTemplate;
    private final UserTagMapper userTagMapper;
    private final TagMapper tagMapper;

    public UserServiceImpl(StringRedisTemplate redisTemplate, UserTagMapper userTagMapper, TagMapper tagMapper) {
        this.redisTemplate = redisTemplate;
        this.userTagMapper = userTagMapper;
        this.tagMapper = tagMapper;
    }

    @Override
    public UserVO getUserDetail(Long id) {
        User user = getById(id);
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        UserVO vo = new UserVO();
        vo.setId(user.getId());
        vo.setName(user.getName());
        vo.setOnline(isOnline(id));
        vo.setCreditScore(user.getCreditScore());
        vo.setAvgResponseMinutes(user.getAvgResponseMinutes());

        List<UserTag> userTags = userTagMapper.selectList(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<UserTag>().eq("user_id", id));
        Set<Long> tagIds = userTags.stream().map(UserTag::getTagId).collect(Collectors.toSet());
        if (!tagIds.isEmpty()) {
            List<Tag> tags = tagMapper.selectBatchIds(tagIds);
            vo.setTags(tags.stream().map(this::toTagVO).collect(Collectors.toList()));
        }
        return vo;
    }

    private TagVO toTagVO(Tag tag) {
        TagVO vo = new TagVO();
        vo.setId(tag.getId());
        vo.setName(tag.getName());
        return vo;
    }

    @Override
    public void heartbeat(Long id) {
        String key = "user:online:" + id;
        redisTemplate.opsForValue().set(key, "1", 60, TimeUnit.SECONDS);
    }

    @Override
    public boolean isOnline(Long id) {
        try {
            Boolean exists = redisTemplate.hasKey("user:online:" + id);
            if (Boolean.TRUE.equals(exists)) {
                return true;
            }
        } catch (Exception e) {
            // Redis 异常时 fallback 到数据库
        }
        User user = getById(id);
        return user != null && Integer.valueOf(1).equals(user.getOnlineStatus());
    }
}
