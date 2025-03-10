import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
