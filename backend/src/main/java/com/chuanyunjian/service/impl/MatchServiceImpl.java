package com.chuanyunjian.service.impl;

import com.chuanyunjian.entity.Demand;
import com.chuanyunjian.entity.DemandTag;
import com.chuanyunjian.entity.Tag;
import com.chuanyunjian.entity.User;
import com.chuanyunjian.entity.UserTag;
import com.chuanyunjian.mapper.DemandMapper;
import com.chuanyunjian.mapper.DemandTagMapper;
import com.chuanyunjian.mapper.TagMapper;
import com.chuanyunjian.mapper.UserMapper;
import com.chuanyunjian.mapper.UserTagMapper;
import com.chuanyunjian.service.MatchService;
import com.chuanyunjian.service.UserService;
import com.chuanyunjian.util.DistanceUtil;
import com.chuanyunjian.vo.MatchResultVO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MatchServiceImpl implements MatchService {

    private final DemandMapper demandMapper;
    private final DemandTagMapper demandTagMapper;
    private final UserMapper userMapper;
    private final UserTagMapper userTagMapper;
    private final TagMapper tagMapper;
    private final UserService userService;

    public MatchServiceImpl(DemandMapper demandMapper, DemandTagMapper demandTagMapper,
                            UserMapper userMapper, UserTagMapper userTagMapper,
                            TagMapper tagMapper, UserService userService) {
        this.demandMapper = demandMapper;
        this.demandTagMapper = demandTagMapper;
        this.userMapper = userMapper;
        this.userTagMapper = userTagMapper;
        this.tagMapper = tagMapper;
        this.userService = userService;
    }

    @Override
    public List<MatchResultVO> match(Long demandId) {
        Demand demand = demandMapper.selectById(demandId);
        if (demand == null) {
            throw new RuntimeException("需求不存在");
        }

        // 需求标签
        List<DemandTag> demandTags = demandTagMapper.selectList(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<DemandTag>().eq("demand_id", demandId));
        Set<Long> demandTagIds = demandTags.stream().map(DemandTag::getTagId).collect(Collectors.toSet());
        if (demandTagIds.isEmpty()) {
            return Collections.emptyList();
        }

        // 所有技能方
        List<User> users = userMapper.selectList(null);
        if (users.isEmpty()) {
            return Collections.emptyList();
        }

        // 批量查询用户标签
        List<UserTag> userTags = userTagMapper.selectList(null);
        Map<Long, Set<Long>> userTagMap = new HashMap<>();
        for (UserTag ut : userTags) {
            userTagMap.computeIfAbsent(ut.getUserId(), k -> new HashSet<>()).add(ut.getTagId());
        }

        // 批量查询标签名称
        List<Tag> allTags = tagMapper.selectList(null);
        Map<Long, String> tagNameMap = allTags.stream().collect(Collectors.toMap(Tag::getId, Tag::getName));

        List<MatchResultVO> results = new ArrayList<>();
        for (User user : users) {
            // 跳过需求发布者自己
            if (user.getId().equals(demand.getUserId())) {
                continue;
            }

            Set<Long> utags = userTagMap.getOrDefault(user.getId(), Collections.emptySet());
            if (utags.isEmpty()) {
                continue;
            }

            double distance = calculateDistance(demand, user);
            if (distance > 10.0) {
                continue;
            }

            int tagMatchScore = calculateTagMatchScore(demandTagIds, utags);
            int distanceScore = calculateDistanceScore(distance);
            boolean online = userService.isOnline(user.getId());
            int onlineScore = online ? 100 : 40;

            double matchScore = tagMatchScore * 0.60 + distanceScore * 0.25 + onlineScore * 0.15;

            MatchResultVO vo = new MatchResultVO();
            vo.setUserId(user.getId());
            vo.setName(user.getName());
            vo.setTags(utags.stream().map(tagNameMap::get).collect(Collectors.toList()));
            vo.setDistance(round(distance, 1));
            vo.setOnline(online);
            vo.setResponseMinutes(user.getAvgResponseMinutes());
            vo.setCreditScore(user.getCreditScore());
            vo.setTagMatchRate(tagMatchScore);
            vo.setMatchScore((int) Math.round(matchScore));
            results.add(vo);
        }

        results.sort((a, b) -> b.getMatchScore().compareTo(a.getMatchScore()));
        return results.size() > 10 ? results.subList(0, 10) : results;
    }

    private int calculateTagMatchScore(Set<Long> demandTagIds, Set<Long> userTagIds) {
        int matchCount = 0;
        for (Long tagId : demandTagIds) {
            if (userTagIds.contains(tagId)) {
                matchCount++;
            }
        }
        return (int) Math.round(matchCount * 100.0 / demandTagIds.size());
    }

    private int calculateDistanceScore(double distance) {
        if (distance <= 2.0) return 100;
        if (distance <= 3.0) return 80;
        if (distance <= 5.0) return 50;
        return 20;
    }

    private double calculateDistance(Demand demand, User user) {
        if (demand.getLatitude() == null || demand.getLongitude() == null
                || user.getLatitude() == null || user.getLongitude() == null) {
            return 999.0;
        }
        return DistanceUtil.calculateDistance(
                demand.getLatitude().doubleValue(), demand.getLongitude().doubleValue(),
                user.getLatitude().doubleValue(), user.getLongitude().doubleValue());
    }

    private double round(double value, int places) {
        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, java.math.RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
}
