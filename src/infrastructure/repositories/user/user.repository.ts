import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/domain/user/user';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: User) {
    await this.prismaService.user.create({
      data: {
        email: dto.getEmail,
        birthday: new Date('04.01.1995'),
        firstName: dto.getFirstName,
        lastName: dto.getLastName,
        password: dto.getPassword,
        employmentStatus: dto.getEmploymentStatus,
        userRole: dto.getUserRole,
        providerCompanyId: dto.getProviderCompanyId,
      },
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({});

    return plainToInstance(User, users);
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return plainToInstance(User, user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return plainToInstance(User, user);
  }

  async update(id: string, dto: User): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        password: dto.getPassword,
        employmentStatus: dto.getEmploymentStatus,
        userRole: dto.getUserRole,
        providerCompanyId: dto.getProviderCompanyId,
      },
    });

    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<User> {
    const removedUser = await this.prismaService.user.delete({ where: { id } });
    return plainToInstance(User, removedUser);
  }
}
