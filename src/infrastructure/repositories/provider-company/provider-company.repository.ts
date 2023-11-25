import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { IProviderCompanyRepository } from '@application/common/interfaces/provider-company/provider-company-repository.interface';
import { ProviderCompany } from '@domain/provider-company/provider-company';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProviderCompanyRepository implements IProviderCompanyRepository {
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

  update(): Promise<void> {
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

  async findAll(): Promise<ProviderCompany[]> {
    const providerCompanies = await this.db.providerCompany.findMany({});

    return plainToInstance(ProviderCompany, providerCompanies);
  }
}
