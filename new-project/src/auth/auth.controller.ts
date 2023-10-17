import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, ResetPasswordDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.login(authCredentialsDto);
    return { accessToken };
  }

  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    await this.authService.resetPassword(resetPasswordDto.email);
  }

  //@Post('/refresh')
  //async refreshToken(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
  //  const accessToken = await this.authService.refreshToken(authCredentialsDto.refreshToken);
  //  return { accessToken };
  //}
}