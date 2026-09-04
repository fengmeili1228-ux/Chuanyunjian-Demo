package com.chuanyunjian.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chuanyunjian.entity.User;
import com.chuanyunjian.vo.UserVO;

public interface UserService extends IService<User> {

    UserVO getUserDetail(Long id);

    void heartbeat(Long id);

    boolean isOnline(Long id);
}
