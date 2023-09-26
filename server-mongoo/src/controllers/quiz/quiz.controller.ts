import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateQuizDto } from 'src/models/dto/create-quiz.dto';
import { QuizDto } from 'src/models/dto/quiz.dto';
import { QuizService } from 'src/services/quiz/quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto): Promise<QuizDto> {
    try {
      return this.quizService.create(createQuizDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Put(':name')
  async update(
    @Param('name') name: string,
    @Body() updateQuizDto: CreateQuizDto,
  ): Promise<QuizDto> {
    return this.quizService.update(name, updateQuizDto);
  }

  @Delete(':name')
  async delete(@Param('name') name: string): Promise<void> {
    return this.quizService.delete(name);
  }

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<QuizDto> {
    return this.quizService.findByName(name);
  }

  @Get()
  async findAll(): Promise<QuizDto[]> {
    return this.quizService.findAll();
  }
}
