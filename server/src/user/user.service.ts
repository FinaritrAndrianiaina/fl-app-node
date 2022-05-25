import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async upsertUser(user: User) {
    return this.prismaService.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }
}
