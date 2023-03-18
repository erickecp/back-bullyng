import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { Video } from './entities/video.entity';

@Module({
  controllers: [VideoController],
  imports: [TypeOrmModule.forFeature([Video])],
  providers: [VideoService]
})
export class VideoModule {}
