import { Injectable, UnauthorizedException } from "@nestjs/common";
import { hashToken } from "../utils/hashToken";
import { PrismaService } from "src/core/database/prisma.service";

@Injectable()
export class logoutService{
    constructor(private readonly prisma:PrismaService){}
     async logout(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const tokenHash = hashToken(refreshToken);

    await this.prisma.refreshToken.deleteMany({
      where: { tokenHash },
    });
  }
}