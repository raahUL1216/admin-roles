import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("/")
@ApiTags("test api")
export class AppController {
  @Get()
  async test_get() {
    return "Hello World!";
  }
}
