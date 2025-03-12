import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ChatController } from './chat/chat.controller';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [UsersModule, DatabaseModule, ChatModule, ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController, ChatController],
  providers: [AppService, DatabaseService, ChatService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
