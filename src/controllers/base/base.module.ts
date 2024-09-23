import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CacheModule} from '@nestjs/cache-manager';
import * as fsStore from 'cache-manager-fs-hash';

@Module({
    imports:[
        CacheModule.register({
          store: fsStore,
          options: {
            path: 'cache', // 快取檔案存儲位置
            ttl: 60 * 60, // 項目在快取中的存活時間（秒）
            maxsize: 1000 * 1000 * 1000, // 快取大小限制，單位為字節
          },
        }),
        PrismaModule,
    
    ],
    providers:[JwtService],
    exports:[CacheModule, JwtService, PrismaModule],
})
export class BaseModule {}
