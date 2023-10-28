import { PresignedUrlReturnModel } from '../../types/file-upload.types';

export interface IFileServiceInterface {
  upload(file: File): Promise<string>;
  getDownloadLink(fileId: string): Promise<string>;
  getPresignedUrl(fileName: string): Promise<PresignedUrlReturnModel | null>;
  getPresignedUrls(
    fileNames: Array<string>,
  ): Promise<Array<PresignedUrlReturnModel | null>>;
}
