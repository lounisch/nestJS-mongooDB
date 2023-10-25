import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './controllers/quiz/quiz.controller';
import { QuizService } from './services/quiz/quiz.service';
import { Quiz, QuizSchema } from './models/schema/quiz.schema';
import { Question, QuestionSchema } from './models/schema/question.schema';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'testQuiz',
    }),
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Quiz.name, schema: QuizSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService, ChatGateway],
})
export class AppModule {}
