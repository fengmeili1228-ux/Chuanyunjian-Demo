package com.chuanyunjian.controller;

import com.chuanyunjian.common.Result;
import com.chuanyunjian.dto.CreateDemandRequest;
import com.chuanyunjian.service.DemandService;
import com.chuanyunjian.vo.DemandVO;
import com.chuanyunjian.vo.MatchResultVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/demands")
@Tag(name = "需求管理")
public class DemandController {

    private final DemandService demandService;

    public DemandController(DemandService demandService) {
        this.demandService = demandService;
    }

    @PostMapping
    @Operation(summary = "发布需求")
    public Result<Map<String, Long>> create(@RequestBody CreateDemandRequest request) {
        Long id = demandService.createDemand(request);
        Map<String, Long> data = new HashMap<>();
        data.put("id", id);
        return Result.success(data);
    }

    @GetMapping("/{id}")
    @Operation(summary = "查询需求")
    public Result<DemandVO> getById(@PathVariable Long id) {
        return Result.success(demandService.getDemandDetail(id));
    }

    @GetMapping("/{id}/matches")
    @Operation(summary = "需求匹配结果")
    public Result<List<MatchResultVO>> matches(@PathVariable Long id) {
        return Result.success(demandService.getMatches(id));
    }
}
