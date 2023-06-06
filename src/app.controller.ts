import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "./infrastructure/common/guards/public.decorator";

@Controller("/")
@ApiTags("Test API")
export class AppController {
  @Public()
  @Get()
  async test_get() {
    return "Hello World!";
  }
}
