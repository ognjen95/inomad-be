import { Inject, Injectable } from '@nestjs/common';

import { User } from '@domain/user/entity/user';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { IUserRepository } from '@application/common/interfaces/user/user-repository.interface';
import { UserQueryOptionsInput } from '@domain/user/dtos/query-options.input';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: User): Promise<User> {
    const providerCompany = dto.getProviderCompanyId
      ? {
          connect: {
            id: dto.getProviderCompanyId,
          },
        }
      : undefined;

    const user = await this.prismaService.user.create({
      data: {
        email: dto.getEmail,
        birthday: dto.getBirthday,
        firstName: dto.getFirstName,
        lastName: dto.getLastName,
        employmentStatus: dto.getEmploymentStatus,
        userRole: dto.getUserRole,
        // providerCompanyId: dto.getProviderCompanyId,
        providerCompany,
        externalId: dto.getExternalId,
        phone: dto.getPhone,
        nationality: dto.getNationality,
      },
    });

    return plainToInstance(User, user);
  }

  async findAll(options: UserQueryOptionsInput): Promise<User[]> {
    const userRole = options.userRoles
      ? {
          in: options.userRoles,
        }
      : undefined;

    const users = await this.prismaService.user.findMany({
      where: {
        userRole,
      },
      include: {
        providerCases: {
          select: {
            id: true,
          },
        },
      },
    });

    return plainToInstance(User, users);
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    return plainToInstance(User, user);
  }

  async findOneByExternalId(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { externalId: id },
      select: {
        id: true,
        userRole: true,
        providerCompanyId: true,
        applicationIds: true,
        firstName: true,
        lastName: true,
      },
    });
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
        employmentStatus: dto.getEmploymentStatus,
        userRole: dto.getUserRole,
        providerCompanyId: dto.getProviderCompanyId,
        applicationIds: dto.getApplicationIds,
      },
    });

    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<User> {
    const removedUser = await this.prismaService.user.delete({ where: { id } });
    return plainToInstance(User, removedUser);
  }
}
