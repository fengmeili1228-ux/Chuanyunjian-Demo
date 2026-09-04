package com.chuanyunjian;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.chuanyunjian.mapper")
public class ChuanyunjianApplication {
    public static void main(String[] args) {
        SpringApplication.run(ChuanyunjianApplication.class, args);
    }
}
