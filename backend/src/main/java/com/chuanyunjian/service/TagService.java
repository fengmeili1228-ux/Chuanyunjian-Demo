package com.chuanyunjian.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chuanyunjian.dto.CreateTagRequest;
import com.chuanyunjian.dto.UpdateTagRequest;
import com.chuanyunjian.entity.Tag;
import com.chuanyunjian.vo.TagVO;

import java.util.List;

public interface TagService extends IService<Tag> {

    List<TagVO> listTree();

    Long createTag(CreateTagRequest request);

    void updateTag(Long id, UpdateTagRequest request);

    void deleteTag(Long id);
}
