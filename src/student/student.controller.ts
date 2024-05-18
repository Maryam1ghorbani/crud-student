import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { response } from 'express';
import {
  CreateStudentDTO,
  DeleteStudentByIdDTO,
  FindStudentByIdDTO,
  UpdateStudentByIdDTO,
} from 'src/model/dto/student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(@Res() response, @Body() data: CreateStudentDTO) {
    try {
      const newStudent = await this.studentService.createStudent(data);
      return response.status(HttpStatus.CREATED).json({
        message: 'student has been created successfully',
        newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error:student not created ',
        error: 'Bad request',
      });
    }
  }

  @Get()
  async getAllStudent(@Res() response) {
    try {
      const students = await this.studentService.getAllstudent();
      return response.status(HttpStatus.OK).json({
        message: 'all student find',
        students,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('find:id')
  async findStudentById(@Param('id') data: FindStudentByIdDTO) {
    try {
      const student = await this.studentService.findStudentById(data);
      return response.status(HttpStatus.OK).json({
        message: 'student find',
        student,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('update:id')
  async updateStudentById(@Param('id') data: UpdateStudentByIdDTO) {
    try {
      const student = await this.studentService.updateStudentById(data);
      return response.status(HttpStatus.OK).json({
        message: 'uodate find',
        student,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('delete:id')
  async deleteStudentById(@Param('id') data: DeleteStudentByIdDTO) {
    try {
      await this.studentService.deleteStudentById(data);
      return response.status(HttpStatus.OK).json({
        message: 'delete student',
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
