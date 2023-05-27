import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { EdgesResponse } from 'src/application/common/types/query-return.type';
import { ITimeOffRequestRepository } from 'src/application/common/interfaces/time-off/time-off-request.interface';
import { TimeOffRequest } from 'src/domain/time-off/TimeOffRequest';
import { TimeOffRequestQueryOptions } from 'src/domain/time-off/dtos/time-off-request-query-options';

@Injectable()
export class TimeOffRequestRepository implements ITimeOffRequestRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: TimeOffRequest): Promise<TimeOffRequest> {
    const timeOffRequest = await this.prismaService.timeOffRequest.create({
      data: {
        timeOffId: dto.getTimeOffId,
        startDate: dto.getStartDate,
        endDate: dto.getEndDate,
        reason: dto.getReason,
        requestedById: dto.getRequestedById,
      },
    });

    return plainToInstance(TimeOffRequest, timeOffRequest);
  }

  async update(dto: TimeOffRequest): Promise<TimeOffRequest> {
    const timeOffRequest = await this.prismaService.timeOffRequest.update({
      where: {
        id: dto.getId,
      },
      data: {
        approvedAt: dto.getApprovedAt,
        approvedById: dto.getApprovedById,
      },
    });

    return plainToInstance(TimeOffRequest, timeOffRequest);
  }

  async findOneById(id: string): Promise<TimeOffRequest> {
    const timeOffRequest = await this.prismaService.timeOffRequest.findUnique({
      where: {
        id,
      },
    });

    return plainToInstance(TimeOffRequest, timeOffRequest);
  }

  async findAll(
    dto: TimeOffRequestQueryOptions,
  ): Promise<EdgesResponse<TimeOffRequest>> {
    const timeOffRequests = await this.prismaService.timeOffRequest.findMany({
      where: {
        approvedById: {
          isSet: dto.isApproved,
        },
        OR: [
          {
            requestedById: dto?.requestedById,
          },
          {
            approvedById: dto?.approvedById,
          },
          {
            timeOffId: dto?.timeOffId,
          },
          {
            requestedById: dto?.requestedById,
          },
        ],
      },
    });

    return this.edgesFactory(plainToInstance(TimeOffRequest, timeOffRequests));
  }

  edgesFactory = async (
    timeOffRequest: TimeOffRequest[],
  ): Promise<EdgesResponse<TimeOffRequest>> => {
    const totalCount = await this.prismaService.timeOffRequest.count();

    return {
      totalCount,
      edges: timeOffRequest.map((item) => {
        return {
          cursor: item.getId,
          node: plainToInstance(TimeOffRequest, item),
        };
      }),
      pageInfo: {
        startCursor: timeOffRequest[0]?.getId,
        endCursor: timeOffRequest[timeOffRequest.length - 1]?.getId,
      },
    };
  };
}
