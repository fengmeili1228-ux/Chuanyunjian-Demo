package com.chuanyunjian.vo;

import java.util.List;

public class TagVO {
    private Long id;
    private String name;
    private Long parentId;
    private String category;
    private List<TagVO> children;

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

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<TagVO> getChildren() {
        return children;
    }

    public void setChildren(List<TagVO> children) {
        this.children = children;
    }
}
