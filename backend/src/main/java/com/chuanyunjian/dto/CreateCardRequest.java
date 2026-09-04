package com.chuanyunjian.dto;

import java.util.List;

public class CreateCardRequest {
    private Long userId;
    private Long coreTagId;
    private List<Long> tagIds;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCoreTagId() {
        return coreTagId;
    }

    public void setCoreTagId(Long coreTagId) {
        this.coreTagId = coreTagId;
    }

    public List<Long> getTagIds() {
        return tagIds;
    }

    public void setTagIds(List<Long> tagIds) {
        this.tagIds = tagIds;
    }
}
