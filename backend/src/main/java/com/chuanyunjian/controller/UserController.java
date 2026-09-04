package com.chuanyunjian.controller;

import com.chuanyunjian.common.Result;
import com.chuanyunjian.entity.User;
import com.chuanyunjian.service.UserService;
import com.chuanyunjian.vo.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Tag(name = "用户管理")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    @Operation(summary = "查询用户详情")
    public Result<UserVO> getById(@PathVariable Long id) {
        return Result.success(userService.getUserDetail(id));
    }

    @PostMapping
    @Operation(summary = "创建用户")
    public Result<Map<String, Long>> create(@RequestBody User user) {
        userService.save(user);
        Map<String, Long> data = new HashMap<>();
        data.put("id", user.getId());
        return Result.success(data);
    }

    @PostMapping("/{id}/heartbeat")
    @Operation(summary = "用户心跳")
    public Result<Void> heartbeat(@PathVariable Long id) {
        userService.heartbeat(id);
        return Result.success();
    }
}
