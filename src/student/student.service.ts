import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateStudentDTO,
  DeleteStudentByIdDTO,
  FindStudentByIdDTO,
  UpdateStudentByIdDTO,
} from 'src/model/dto/student.dto';
import { Student } from 'src/model/student.schem';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<Student>) {}

  async createStudent(data: CreateStudentDTO): Promise<Student> {
    const newStudent = await new this.studentModel(data);
    return newStudent.save();
  }

  async getAllstudent(): Promise<Student[]> {
    const allStudent = await this.studentModel.find();
    if (!allStudent || allStudent.length == 0) {
      throw new NotFoundException('student not found');
    }
    return allStudent;
  }

  async findStudentById(data: FindStudentByIdDTO) {
    const student = await this.studentModel.findById(data);
    if (!student) {
      throw new NotFoundException('student not found');
    }
    return student;
  }

  async updateStudentById(data: UpdateStudentByIdDTO): Promise<Student> {
    await this.studentModel.updateOne(
      {
        _id: data._id,
      },
      {
        $set: {
          name: data.name,
          roleNumber: data.roleNumber,
          class: data.class,
          gender: data.gender,
          marks: data.marks,
        },
      },
    );
    const student = await this.studentModel.findById(data);
    return student;
  }

  async deleteStudentById(data: DeleteStudentByIdDTO) {
    await this.studentModel.deleteOne({
      _id: data._id,
    });
  }
}
