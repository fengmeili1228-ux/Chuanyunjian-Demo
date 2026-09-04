package com.chuanyunjian.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.chuanyunjian.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}
