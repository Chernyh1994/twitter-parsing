import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService],
})

export class UsersModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
       consumer
        .apply(LoggerMiddleware)
        .forRoutes(UsersController);
    }
}
