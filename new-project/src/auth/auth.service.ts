import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor() {}

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;
    // Verificar si el usuario ya está registrado
    const userRecord = await admin.auth().getUserByEmail(email).catch((error) => {
      // Si el usuario no existe, userRecord será undefined, de lo contrario, contendrá información del usuario
      return undefined;
    });
    if (userRecord) throw new UnauthorizedException('Usuario ya registrado');
    // Hasheo de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el usuario en Firebase Authentication
    await admin.auth().createUser({ email, password: hashedPassword });
    // Envía un correo de verificación al usuario
    await admin.auth().generateEmailVerificationLink(email).then((link) => {
      // Envía el enlace de verificación al usuario
      // Implementa la lógica para enviar el correo aquí
    });
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentialsDto;
  
    try {
      // Utiliza 'as' para convertir el tipo de userRecord
      const userRecord = await admin.auth().getUserByEmail(email) as admin.auth.UserRecord;
    
      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, userRecord.passwordHash);
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
  
      // Generar y devolver un token de acceso
      const accessToken = await this.generateAccessToken(userRecord.uid);
      return accessToken;
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
  

  async resetPassword(email: string): Promise<void> {
    // Verificar si el usuario con el correo proporcionado existe
    const userRecord = await admin.auth().getUserByEmail(email).catch((error) => {
      // Si el usuario no existe, userRecord será undefined
      return undefined;
    });

    if (!userRecord) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Generar un token para restablecer la contraseña y enviar un correo al usuario
    const resetPasswordLink = await admin.auth().generatePasswordResetLink(email);
    // Implementa la logica para enviar un email
    //await sendEmail(email, resetPasswordLink);
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(refreshToken);
      return await this.generateAccessToken(decodedToken.uid);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      throw new UnauthorizedException('Token de autenticación no válido');
    }
  }

  private async generateAccessToken(uid: string): Promise<string> {
    const customToken = await admin.auth().createCustomToken(uid);
    return customToken;
  }

}
