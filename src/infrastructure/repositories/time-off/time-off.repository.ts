import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { TimeOff } from '@domain/time-off/TimeOff';
import { ITimeOffRepository } from '@application/common/interfaces/time-off/time-off-repository.interface';
import { EdgesResponse } from '@application/common/types/query-return.type';

@Injectable()
export class TimeOffRepository implements ITimeOffRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: TimeOff): Promise<TimeOff> {
    const timeOff = await this.prismaService.timeOff.create({
      data: {
        name: dto.getName,
        forYear: dto.getForYear,
        totalDays: dto.getTotalDays,
        remainingDays: dto.getRemainingDays,
        employeeId: dto.getEmployeeId,
      },
    });

    return plainToInstance(TimeOff, timeOff);
  }

  async update(dto: TimeOff): Promise<TimeOff> {
    const timeOff = await this.prismaService.timeOff.update({
      where: {
        id: dto.getId,
      },
      data: {
        name: dto.getName,
        forYear: dto.getForYear,
        totalDays: dto.getTotalDays,
        remainingDays: dto.getRemainingDays,
        employeeId: dto.getEmployeeId,
      },
    });

    return plainToInstance(TimeOff, timeOff);
  }

  async findAll(): Promise<EdgesResponse<TimeOff>> {
    const timeOffs = await this.prismaService.timeOff.findMany({
      where: {
        employeeId: {
          isSet: false,
        },
      },
    });

    return this.edgesFactory(plainToInstance(TimeOff, timeOffs));
  }

  async findOneById(id: string): Promise<TimeOff> {
    const timeOff = await this.prismaService.timeOff.findUnique({
      where: {
        id,
      },
    });

    return plainToInstance(TimeOff, timeOff);
  }

  async findByEmployeeId(
    employeeId: string,
    forYear?: number,
  ): Promise<TimeOff[]> {
    const timeOffs = await this.prismaService.timeOff.findMany({
      where: {
        employeeId,
        forYear: forYear ?? new Date().getFullYear(),
      },
    });

    return plainToInstance(TimeOff, timeOffs);
  }

  edgesFactory = async (
    timeOff: TimeOff[],
  ): Promise<EdgesResponse<TimeOff>> => {
    const totalCount = await this.prismaService.timeOff.count();

    return {
      totalCount,
      edges: timeOff.map((item) => {
        return {
          cursor: item.getId,
          node: plainToInstance(TimeOff, item),
        };
      }),
      pageInfo: {
        startCursor: timeOff[0]?.getId,
        endCursor: timeOff[timeOff.length - 1]?.getId,
      },
    };
  };
}
