import * as Minio from 'minio';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
  private readonly minio: Minio.Client;
  private readonly bucketName: string;

  constructor(
    public configService: ConfigService,
  ) {
    const endPoint = this.configService.get<string>('MINIO_ENDPOINT') || '';
    const port = Number(this.configService.get<number>('MINIO_PORT') || 9000);
    const useSSL = this.configService.get<string>('MINIO_USE_SSL') === 'true';
    const accessKey = this.configService.get<string>('MINIO_ACCESS_KEY') || '';
    const secretKey = this.configService.get<string>('MINIO_SECRET_KEY') || '';

    this.minio = new Minio.Client({
      endPoint,
      port,
      useSSL,
      accessKey,
      secretKey,
    });

    this.bucketName = this.configService.get<string>('MINIO_BUCKET_NAME') || '';
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minio.bucketExists(this.bucketName);

    if (!bucketExists) {
      await this.minio.makeBucket(this.bucketName, 'eu-west-1');
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;

    await this.minio.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size
    );

    return fileName;
  }

  async getFileUrl(fileName: string) {
    return await this.minio.presignedUrl('GET', this.bucketName, fileName);
  }

  async deleteFile(fileName: string) {
    await this.minio.removeObject(this.bucketName, fileName);
  }
}
