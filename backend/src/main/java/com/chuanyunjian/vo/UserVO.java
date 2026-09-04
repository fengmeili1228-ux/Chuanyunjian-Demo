package com.chuanyunjian.vo;

import java.util.List;

public class UserVO {
    private Long id;
    private String name;
    private Boolean online;
    private Integer creditScore;
    private Integer avgResponseMinutes;
    private List<TagVO> tags;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getOnline() {
        return online;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }

    public Integer getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(Integer creditScore) {
        this.creditScore = creditScore;
    }

    public Integer getAvgResponseMinutes() {
        return avgResponseMinutes;
    }

    public void setAvgResponseMinutes(Integer avgResponseMinutes) {
        this.avgResponseMinutes = avgResponseMinutes;
    }

    public List<TagVO> getTags() {
        return tags;
    }

    public void setTags(List<TagVO> tags) {
        this.tags = tags;
    }
}
