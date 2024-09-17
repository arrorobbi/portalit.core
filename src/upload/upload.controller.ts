import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../misc/multer'; // Path to your multer configuration

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully!',
      filename: file.filename,
      path: `/${file.filename}`, // Path to access the uploaded file
    };
  }
}
