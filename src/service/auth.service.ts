import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AuthService {
    constructor() {}

    async verifyUserOrThrow(email: string): Promise<string | never> {
        try {
            return email;
        } catch (error) {
            throw new RpcException('email not found');
        }
    }
}