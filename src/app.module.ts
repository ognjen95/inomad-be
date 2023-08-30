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
import { CasesModule } from './presentation/modules/cases/cases.module';
import { ProviderCompanyModule } from './presentation/modules/provider-company/provider-company.module';
import { CaseRequestModule } from './presentation/modules/cases/case-request.module';
import { AuthModule } from './presentation/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './presentation/decorators/authorization-guard';
import { DocumentsModule } from './presentation/modules/documents/documents.module';

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
    CasesModule,
    ProviderCompanyModule,
    CaseRequestModule,
    AuthModule,
    DocumentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
