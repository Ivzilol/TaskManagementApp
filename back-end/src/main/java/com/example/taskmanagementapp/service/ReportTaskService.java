package com.example.taskmanagementapp.service;

import com.example.taskmanagementapp.model.entity.Tasks;
import com.example.taskmanagementapp.repository.TasksRepository;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ReportTaskService {

    private final TasksRepository tasksRepository;

    public ReportTaskService(TasksRepository tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    public List<Tasks> generateExcel(HttpServletResponse response, Long userId) throws IOException {
        List<Tasks> allTasks = tasksRepository.findAllTasks(userId);

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Task Info");
        HSSFRow row = sheet.createRow(0);
        row.createCell(0).setCellValue("Title");
        row.createCell(1).setCellValue("Description");
        row.createCell(2).setCellValue("Priority");
        row.createCell(3).setCellValue("Start Date");
        row.createCell(4).setCellValue("End Date");

        int dateRowIndex = 1;

        for (Tasks tasks : allTasks) {
            HSSFRow dateRow = sheet.createRow(dateRowIndex);
            dateRow.createCell(0).setCellValue(tasks.getId());
            dateRow.createCell(1).setCellValue(tasks.getDescription());
            dateRow.createCell(2).setCellValue(tasks.getPriority());
            dateRow.createCell(3).setCellValue(tasks.getStartDateTask());
            dateRow.createCell(4).setCellValue(tasks.getEndDateTask());
            dateRowIndex++;
        }

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
        return allTasks;
    }
}
