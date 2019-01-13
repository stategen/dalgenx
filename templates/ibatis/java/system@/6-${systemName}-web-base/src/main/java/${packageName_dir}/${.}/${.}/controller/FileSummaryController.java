package com.mycompany.biz.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;

import com.mycompany.biz.domain.FileSummary;

import io.swagger.annotations.ApiParam;

@Controller
@ApiConfig(name = "上传下载", menu = false, genModel = false, genRoute = false)
public class FileSummaryController extends FileSummaryControllerBase {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(FileSummaryController.class);
    static final String UPLOADS = "/uploads/";

    /*
    * 采用file.Transto 来保存上传的文件
    */
    @ApiRequestMappingAutoWithMethodName
    public FileSummary upload(@RequestParam("file") MultipartFile file, @ApiParam(hidden = true) FileSummary fileSummary,
                             HttpServletRequest request) throws IOException {
        String name = file.getOriginalFilename();
        String newFilename = new Date().getTime() + name;
        String path = UPLOADS + newFilename;
        File newFile = new File(path);
        if (!newFile.exists()) {
            newFile.getParentFile().mkdir();
        }
        
        file.transferTo(newFile);

        fileSummary.setName(name);
        fileSummary.setUrl(UPLOADS + newFilename);
        fileSummary.setSize(file.getSize());
        this.fileSummaryService.insert(fileSummary);

        return fileSummary;

    }

}
