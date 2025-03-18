import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { UtilsService } from './services/utils/utils.service';

@Global()
@Module({
  providers: [CommonService, UtilsService],
  exports: [CommonService, UtilsService],
})
export class CommonModule {}
