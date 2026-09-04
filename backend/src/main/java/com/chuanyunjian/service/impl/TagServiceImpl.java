package com.chuanyunjian.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chuanyunjian.dto.CreateTagRequest;
import com.chuanyunjian.dto.UpdateTagRequest;
import com.chuanyunjian.entity.Tag;
import com.chuanyunjian.mapper.TagMapper;
import com.chuanyunjian.service.TagService;
import com.chuanyunjian.vo.TagVO;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements TagService {

    private static final String TAG_TREE_KEY = "tag:tree";

    private final StringRedisTemplate redisTemplate;

    public TagServiceImpl(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public List<TagVO> listTree() {
        String cached = redisTemplate.opsForValue().get(TAG_TREE_KEY);
        if (cached != null && !cached.isEmpty()) {
            // 缓存中只存 ID 列表，从数据库查完整数据并构建 VO
            return buildFlatVO();
        }
        List<TagVO> result = buildFlatVO();
        if (!result.isEmpty()) {
            redisTemplate.opsForValue().set(TAG_TREE_KEY, "1", 10, TimeUnit.MINUTES);
        }
        return result;
    }

    private List<TagVO> buildFlatVO() {
        return lambdaQuery().orderByAsc(Tag::getId).list().stream().map(this::toVO).collect(Collectors.toList());
    }

    private TagVO toVO(Tag tag) {
        TagVO vo = new TagVO();
        vo.setId(tag.getId());
        vo.setName(tag.getName());
        vo.setParentId(tag.getParentId());
        vo.setCategory(tag.getCategory());
        return vo;
    }

    @Override
    public Long createTag(CreateTagRequest request) {
        Tag tag = new Tag();
        tag.setName(request.getName());
        tag.setParentId(request.getParentId());
        tag.setCategory(request.getCategory());
        save(tag);
        clearCache();
        return tag.getId();
    }

    @Override
    public void updateTag(Long id, UpdateTagRequest request) {
        Tag tag = getById(id);
        if (tag == null) {
            throw new RuntimeException("标签不存在");
        }
        tag.setName(request.getName());
        tag.setParentId(request.getParentId());
        tag.setCategory(request.getCategory());
        updateById(tag);
        clearCache();
    }

    @Override
    public void deleteTag(Long id) {
        removeById(id);
        clearCache();
    }

    private void clearCache() {
        redisTemplate.delete(TAG_TREE_KEY);
    }
}
