import { Module } from '@nestjs/common';
import { UsersModule } from './presentation/modules/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { TestsModule } from './presentation/modules/tests/tests.module';
import { QuestionsModule } from './presentation/modules/questions/questions.module';
import { QuestionGroupModule } from './presentation/modules/questions/question-group.module';
import { TimeOffModule } from './presentation/modules/time-off/time-off.module';
import { TimeOffRequestModule } from './presentation/modules/time-off/time-off-request.module';
import { CompensationModule } from './presentation/modules/compensation/compensation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UsersModule,
    TestsModule,
    QuestionsModule,
    QuestionGroupModule,
    TimeOffModule,
    TimeOffRequestModule,
    CompensationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
