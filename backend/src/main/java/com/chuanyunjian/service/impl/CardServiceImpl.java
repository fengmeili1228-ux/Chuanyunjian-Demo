package com.chuanyunjian.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chuanyunjian.dto.CreateCardRequest;
import com.chuanyunjian.entity.Card;
import com.chuanyunjian.entity.Tag;
import com.chuanyunjian.entity.User;
import com.chuanyunjian.entity.UserTag;
import com.chuanyunjian.mapper.CardMapper;
import com.chuanyunjian.mapper.TagMapper;
import com.chuanyunjian.mapper.UserMapper;
import com.chuanyunjian.mapper.UserTagMapper;
import com.chuanyunjian.service.CardService;
import com.chuanyunjian.vo.CardVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CardServiceImpl extends ServiceImpl<CardMapper, Card> implements CardService {

    private final UserMapper userMapper;
    private final TagMapper tagMapper;
    private final UserTagMapper userTagMapper;

    public CardServiceImpl(UserMapper userMapper, TagMapper tagMapper, UserTagMapper userTagMapper) {
        this.userMapper = userMapper;
        this.tagMapper = tagMapper;
        this.userTagMapper = userTagMapper;
    }

    @Override
    @Transactional
    public Long createCard(CreateCardRequest request) {
        Card card = new Card();
        card.setUserId(request.getUserId());
        card.setCoreTagId(request.getCoreTagId());
        if (!CollectionUtils.isEmpty(request.getTagIds())) {
            card.setTagIds(request.getTagIds().stream().map(String::valueOf).collect(Collectors.joining(",")));
        }
        card.setShareCount(0);
        card.setShareLimit(3);
        card.setUnlocked(0);
        save(card);

        // 同步用户标签，用于后续需求匹配
        if (!CollectionUtils.isEmpty(request.getTagIds())) {
            for (Long tagId : request.getTagIds()) {
                UserTag userTag = new UserTag();
                userTag.setUserId(request.getUserId());
                userTag.setTagId(tagId);
                try {
                    userTagMapper.insert(userTag);
                } catch (Exception ignored) {
                    // 重复标签忽略
                }
            }
        }
        return card.getId();
    }

    @Override
    public CardVO getCardDetail(Long id) {
        Card card = getById(id);
        if (card == null) {
            throw new RuntimeException("名片不存在");
        }
        return buildCardVO(card);
    }

    private CardVO buildCardVO(Card card) {
        User user = userMapper.selectById(card.getUserId());
        CardVO vo = new CardVO();
        vo.setId(card.getId());
        vo.setUserId(card.getUserId());
        vo.setName(user != null ? user.getName() : "");
        vo.setAddress("深圳市南山区");
        vo.setCreditScore(user != null ? user.getCreditScore() : 80);
        vo.setShareCount(card.getShareCount());
        vo.setShareLimit(card.getShareLimit());
        vo.setUnlocked(Integer.valueOf(1).equals(card.getUnlocked()));

        List<Long> tagIdList = parseTagIds(card.getTagIds());
        if (!tagIdList.isEmpty()) {
            List<Tag> tags = tagMapper.selectBatchIds(tagIdList);
            Map<Long, String> tagMap = tags.stream().collect(Collectors.toMap(Tag::getId, Tag::getName));
            List<String> tagNames = new ArrayList<>();
            for (Long tagId : tagIdList) {
                if (tagMap.containsKey(tagId)) {
                    tagNames.add(tagMap.get(tagId));
                }
            }
            vo.setTags(tagNames);
            if (card.getCoreTagId() != null && tagMap.containsKey(card.getCoreTagId())) {
                vo.setCoreTag(tagMap.get(card.getCoreTagId()));
            } else if (!tagNames.isEmpty()) {
                vo.setCoreTag(tagNames.get(0));
            }
        }
        return vo;
    }

    private List<Long> parseTagIds(String tagIds) {
        if (tagIds == null || tagIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<Long> result = new ArrayList<>();
        for (String s : tagIds.split(",")) {
            if (!s.trim().isEmpty()) {
                result.add(Long.valueOf(s.trim()));
            }
        }
        return result;
    }

    @Override
    public CardVO share(Long id) {
        Card card = getById(id);
        if (card == null) {
            throw new RuntimeException("名片不存在");
        }
        int newCount = card.getShareCount() + 1;
        card.setShareCount(newCount);
        if (newCount >= card.getShareLimit()) {
            card.setUnlocked(1);
        }
        updateById(card);
        return buildCardVO(card);
    }
}
