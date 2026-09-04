package com.chuanyunjian.controller;

import com.chuanyunjian.common.Result;
import com.chuanyunjian.dto.CreateTagRequest;
import com.chuanyunjian.dto.UpdateTagRequest;
import com.chuanyunjian.service.TagService;
import com.chuanyunjian.vo.TagVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tags")
@Tag(name = "标签管理")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    @Operation(summary = "查询标签列表")
    public Result<List<TagVO>> list() {
        return Result.success(tagService.listTree());
    }

    @PostMapping
    @Operation(summary = "新增标签")
    public Result<Map<String, Long>> create(@RequestBody CreateTagRequest request) {
        Long id = tagService.createTag(request);
        Map<String, Long> data = new HashMap<>();
        data.put("id", id);
        return Result.success(data);
    }

    @PutMapping("/{id}")
    @Operation(summary = "修改标签")
    public Result<Void> update(@PathVariable Long id, @RequestBody UpdateTagRequest request) {
        tagService.updateTag(id, request);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除标签")
    public Result<Void> delete(@PathVariable Long id) {
        tagService.deleteTag(id);
        return Result.success();
    }
}
