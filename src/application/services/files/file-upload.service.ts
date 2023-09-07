import { Injectable } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { PresignedUrlReturnModel } from 'src/application/common/types/file-upload.types';
import { IFileServiceInterface } from 'src/application/common/interfaces/documents/file-upload-service.interface';

@Injectable()
export class FileService implements IFileServiceInterface {
  private client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  private bucketName = process.env.AWS_BUCKET_NAME;

  async upload(file: File) {
    const Key = this.generateFileName(file.name);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Body: file,
      Key,
    });

    await this.client.send(command);

    return Key;
  }

  async getPresignedUrl(fileName: string): Promise<PresignedUrlReturnModel> {
    const Key = this.generateFileName(fileName);

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key,
    });

    const presignedUrl = await getSignedUrl(this.client, command, {
      expiresIn: 3600,
    });

    return {
      link: presignedUrl,
      id: Key,
    };
  }

  async getDownloadLink(fileId: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileId,
    });

    const presignedUrl = await getSignedUrl(this.client, command, {
      expiresIn: 3600,
    });

    return presignedUrl;
  }

  async getPresignedUrls(
    fileNames: Array<string>,
  ): Promise<Array<PresignedUrlReturnModel>> {
    const presignedUrls = await Promise.all(
      fileNames.map(async (fileName) => {
        return this.getPresignedUrl(fileName);
      }),
    );

    return presignedUrls;
  }

  private generateFileName(fileName: string): string {
    return `${randomUUID()}-${fileName}`;
  }
}