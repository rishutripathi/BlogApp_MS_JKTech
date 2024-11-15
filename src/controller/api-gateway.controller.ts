import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UserAuthDto } from "../../../../libs/dto/src/auth/user_auth.dto";
import { firstValueFrom } from "rxjs";

@Controller('api')
export class ApiGatewayController {
    constructor(
        @Inject('AUTH_SVC') private readonly authClient: ClientProxy,
        @Inject('POST_SVC') private readonly postClient: ClientProxy,
        @Inject('USER_SVC') private readonly userClient: ClientProxy
    ) {}

    @Post('auth')
    async authUser(
        @Body() userAuthDto: UserAuthDto
    ): Promise<string> {
        const res = await firstValueFrom(this.authClient.send('auth_user', userAuthDto));

        return res;
    }
}