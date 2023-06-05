import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("/")
@ApiTags("Test API")
export class AppController {
  @Get()
  async test_get() {
    return "Hello World!";
  }
}
