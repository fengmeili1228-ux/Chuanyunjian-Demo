package com.chuanyunjian.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chuanyunjian.dto.CreateDemandRequest;
import com.chuanyunjian.entity.Demand;
import com.chuanyunjian.vo.DemandVO;
import com.chuanyunjian.vo.MatchResultVO;

import java.util.List;

public interface DemandService extends IService<Demand> {

    Long createDemand(CreateDemandRequest request);

    DemandVO getDemandDetail(Long id);

    List<MatchResultVO> getMatches(Long id);
}
