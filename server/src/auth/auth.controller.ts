import { Controller, Post, HttpStatus, HttpCode, Get, Body, Response, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { Login } from './interfaces/login.interface';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async registration(@Response() res,  @Body() createUserDto: CreateUserDto) {
      const result = await this.authService.registration(createUserDto);
      if (!result) {
          return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      return res.status(HttpStatus.OK).json(result);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Response() res, @Body() login: Login) {
    const result = await this.authService.login(login.username, login.password);
    if (!result) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  public async user(@Response() res, @Body() auth) {
    console.log(auth)
    const result = await this.authService.user();
    return res.status(HttpStatus.OK).json(result);
  }

}
