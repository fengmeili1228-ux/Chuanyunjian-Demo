package com.chuanyunjian.controller;

import com.chuanyunjian.common.Result;
import com.chuanyunjian.dto.CreateCardRequest;
import com.chuanyunjian.service.CardService;
import com.chuanyunjian.vo.CardVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cards")
@Tag(name = "名片管理")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    @Operation(summary = "创建名片")
    public Result<Map<String, Long>> create(@RequestBody CreateCardRequest request) {
        Long id = cardService.createCard(request);
        Map<String, Long> data = new HashMap<>();
        data.put("id", id);
        return Result.success(data);
    }

    @GetMapping("/{id}")
    @Operation(summary = "查询名片")
    public Result<CardVO> getById(@PathVariable Long id) {
        return Result.success(cardService.getCardDetail(id));
    }

    @PostMapping("/{id}/share")
    @Operation(summary = "分享名片")
    public Result<CardVO> share(@PathVariable Long id) {
        return Result.success(cardService.share(id));
    }
}
