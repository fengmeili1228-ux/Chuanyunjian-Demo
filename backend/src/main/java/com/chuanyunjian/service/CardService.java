package com.chuanyunjian.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chuanyunjian.dto.CreateCardRequest;
import com.chuanyunjian.entity.Card;
import com.chuanyunjian.vo.CardVO;

public interface CardService extends IService<Card> {

    Long createCard(CreateCardRequest request);

    CardVO getCardDetail(Long id);

    CardVO share(Long id);
}
