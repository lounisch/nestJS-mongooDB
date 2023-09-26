import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from 'src/models/dto/create-quiz.dto';
import { QuizDto } from 'src/models/dto/quiz.dto';
import { Question, QuestionDocument } from 'src/models/schema/question.schema';
import { Quiz, QuizDocument } from 'src/models/schema/quiz.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>,
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {
    this.start();
  }

  async start() {
    const count = await this.quizModel.countDocuments();
    if (count === 0) {
      await this.populateDb();
    }
  }

  async populateDb() {
    const question1 = {
      text: 'What is the capital of France?',
      points: 10,
      order: 1,
      time: 30,
    };

    const question2 = {
      text: 'What is the largest planet in our solar system?',
      points: 15,
      order: 2,
      time: 45,
    };
    const exampleQuizzes = [
      {
        name: 'Quiz 1',
        description: 'Description for Quiz 1',
        timeAllowed: 60,
        questions: [question1, question2],
      },
      {
        name: 'Quiz 2',
        description: 'Description for Quiz 2',
        timeAllowed: 45,
      },
    ];

    await this.quizModel.create(exampleQuizzes);
  }

  async create(createQuizDto: CreateQuizDto): Promise<QuizDto> {
    try {
      const createdQuiz = new this.quizModel(createQuizDto);
      const result = await createdQuiz.save();
      return this.mapToDto(result);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Quiz with name '${createQuizDto.name}' already exists.`,
        );
      }
      throw error;
    }
  }

  async update(name: string, updateQuizDto: CreateQuizDto): Promise<QuizDto> {
    const quiz = await this.quizModel.findOneAndUpdate(
      { name },
      updateQuizDto,
      { new: true },
    );

    if (!quiz) {
      throw new NotFoundException(`Quiz with name '${name}' not found`);
    }

    return this.mapToDto(quiz);
  }

  async delete(name: string): Promise<void> {
    const quiz = await this.quizModel.findOneAndRemove({ name });

    if (!quiz) {
      throw new NotFoundException(`Quiz with name '${name}' not found`);
    }
  }

  async findByName(name: string): Promise<QuizDto> {
    const quiz = await this.quizModel.findOne({ name });

    if (!quiz) {
      throw new NotFoundException(`Quiz with name '${name}' not found`);
    }
    return this.mapToDto(quiz);
  }

  async findAll(): Promise<QuizDto[]> {
    const quizzes = await this.quizModel.find().exec();
    return quizzes.map(this.mapToDto);
  }

  private mapToDto(quiz: Quiz): QuizDto {
    const { name, description, timeAllowed, updatedDate, questions } = quiz;
    return { name, description, timeAllowed, updatedDate, questions };
  }
}
