import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IProviderCompanyRepository } from 'src/application/common/interfaces/provider-company/provider-company-repository.interface';
import { ProviderCompany } from 'src/domain/provider-company/provider-company';
import { plainToInstance } from 'class-transformer';
import { UserQueryOptionsInput } from 'src/domain/user/dtos/query-options.input';

@Injectable()
export class ProviderCompanyRepository implements IProviderCompanyRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: ProviderCompany): Promise<ProviderCompany> {
    const providerCompany = await this.db.providerCompany.create({
      data: {
        name: dto.getName,
        email: dto.getEmail,
        website: dto.getWebsite,
      },
    });

    return plainToInstance(ProviderCompany, providerCompany);
  }

  update(dto: ProviderCompany): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findOneById(id: string): Promise<ProviderCompany> {
    const providerCompany = await this.db.providerCompany.findUnique({
      where: {
        id,
      },
    });

    return plainToInstance(ProviderCompany, providerCompany);
  }

  findAll(options: UserQueryOptionsInput): Promise<ProviderCompany[]> {
    throw new Error('Method not implemented.');
  }
}
