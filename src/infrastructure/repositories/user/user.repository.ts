import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/domain/user/User';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';
import { EdgesResponse } from 'src/application/common/types/query-return.type';
import { QueryOptions } from 'src/application/common/dtos/query-options/query-options.dto';
import { QUERY_TAKE } from '../common/constants';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: User): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        email: dto.getEmail,
        firstName: dto.getFirstName,
        lastName: dto.getLastName,
        password: dto.getPassword,
        employmentStatus: dto.getEmploymentStatus,
      },
    });
    return plainToInstance(User, user);
  }
  async findAll(options: QueryOptions): Promise<EdgesResponse<User>> {
    const { filters, pagination } = options || {};
    const cursor = pagination?.cursor;

    const users = await this.prismaService.user.findMany({
      where: {
        employmentStatus: filters?.employeeStatus?.in.length
          ? {
              in: filters.employeeStatus?.in,
            }
          : undefined,
        OR: [
          {
            firstName: {
              contains: filters?.contains,
              mode: this.caseSensitive,
            },
          },
          {
            lastName: { contains: filters?.contains, mode: this.caseSensitive },
          },
          { email: { contains: filters?.contains, mode: this.caseSensitive } },
          {
            employmentStatus: {
              contains: filters?.contains,
              mode: this.caseSensitive,
            },
          },
        ],
      },
      skip: pagination?.skip,
      take: pagination?.take || QUERY_TAKE,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: pagination?.orderBy || 'desc',
      },
    });
    return this.edgesFactory(plainToInstance(User, users));
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return plainToInstance(User, user);
  }

  async update(id: string, dto: User): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        password: dto.getPassword,
        employmentStatus: dto.getEmploymentStatus,
      },
    });

    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<User> {
    const removedUser = await this.prismaService.user.delete({ where: { id } });
    return plainToInstance(User, removedUser);
  }

  edgesFactory = async (users: User[]): Promise<EdgesResponse<User>> => {
    const totalCount = await this.prismaService.user.count();

    return {
      totalCount,
      edges: users.map((user) => {
        return {
          cursor: user.getId,
          node: plainToInstance(User, user),
        };
      }),
      pageInfo: {
        startCursor: users[0]?.getId,
        endCursor: users[users.length - 1]?.getId,
      },
    };
  };
}
