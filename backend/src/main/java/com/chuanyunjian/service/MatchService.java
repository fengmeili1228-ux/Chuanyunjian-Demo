package com.chuanyunjian.service;

import com.chuanyunjian.vo.MatchResultVO;

import java.util.List;

public interface MatchService {

    List<MatchResultVO> match(Long demandId);
}
