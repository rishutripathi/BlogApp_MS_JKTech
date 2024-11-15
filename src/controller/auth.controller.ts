import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "src/service/auth.service";
import { UserAuthDto } from "../../../../libs/dto/src/auth/user_auth.dto";
import { Observable } from "rxjs";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern('auth_user')
    getUser(@Payload() userAuthDto: UserAuthDto): Promise<string> {
        console.log("getting here???", userAuthDto);
        
        return this.authService.verifyUserOrThrow(userAuthDto.email);
    }
}