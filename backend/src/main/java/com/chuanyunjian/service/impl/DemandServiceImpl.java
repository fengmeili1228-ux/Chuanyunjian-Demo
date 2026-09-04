package com.chuanyunjian.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chuanyunjian.dto.CreateDemandRequest;
import com.chuanyunjian.entity.Demand;
import com.chuanyunjian.entity.DemandTag;
import com.chuanyunjian.entity.Tag;
import com.chuanyunjian.mapper.DemandMapper;
import com.chuanyunjian.mapper.DemandTagMapper;
import com.chuanyunjian.mapper.TagMapper;
import com.chuanyunjian.service.DemandService;
import com.chuanyunjian.service.MatchService;
import com.chuanyunjian.vo.DemandVO;
import com.chuanyunjian.vo.MatchResultVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DemandServiceImpl extends ServiceImpl<DemandMapper, Demand> implements DemandService {

    private final DemandTagMapper demandTagMapper;
    private final TagMapper tagMapper;
    private final MatchService matchService;

    public DemandServiceImpl(DemandTagMapper demandTagMapper, TagMapper tagMapper, MatchService matchService) {
        this.demandTagMapper = demandTagMapper;
        this.tagMapper = tagMapper;
        this.matchService = matchService;
    }

    @Override
    @Transactional
    public Long createDemand(CreateDemandRequest request) {
        Demand demand = new Demand();
        demand.setUserId(request.getUserId());
        demand.setTitle(request.getTitle());
        demand.setBudget(request.getBudget());
        demand.setUrgency(request.getUrgency());
        demand.setLongitude(request.getLongitude());
        demand.setLatitude(request.getLatitude());
        demand.setAddress(request.getAddress());
        save(demand);

        if (!CollectionUtils.isEmpty(request.getTagIds())) {
            for (Long tagId : request.getTagIds()) {
                DemandTag demandTag = new DemandTag();
                demandTag.setDemandId(demand.getId());
                demandTag.setTagId(tagId);
                demandTagMapper.insert(demandTag);
            }
        }
        return demand.getId();
    }

    @Override
    public DemandVO getDemandDetail(Long id) {
        Demand demand = getById(id);
        if (demand == null) {
            throw new RuntimeException("需求不存在");
        }
        DemandVO vo = new DemandVO();
        vo.setId(demand.getId());
        vo.setTitle(demand.getTitle());
        vo.setBudget(demand.getBudget());
        vo.setUrgency(demand.getUrgency());
        vo.setAddress(demand.getAddress());

        List<DemandTag> demandTags = demandTagMapper.selectList(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<DemandTag>().eq("demand_id", id));
        Set<Long> tagIds = demandTags.stream().map(DemandTag::getTagId).collect(Collectors.toSet());
        if (!tagIds.isEmpty()) {
            List<Tag> tags = tagMapper.selectBatchIds(tagIds);
            vo.setTags(tags.stream().map(Tag::getName).collect(Collectors.toList()));
        }
        return vo;
    }

    @Override
    public List<MatchResultVO> getMatches(Long id) {
        return matchService.match(id);
    }
}
