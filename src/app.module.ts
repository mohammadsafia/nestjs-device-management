import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://MohammadSafia:TAfMtUnAQiFoHJzQ@cluster0.t5cfl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
