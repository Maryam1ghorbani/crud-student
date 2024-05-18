import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentSchema } from './model/student.schem';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.get('database.url'),
        };
        return options;
      },
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
