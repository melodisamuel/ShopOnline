import { string } from "joi";
import { HTTP_STATUS } from "../constants/http";

export abstract class CustomError extends Error {
    abstract status: string;
    abstract statuscode: number;
    // status: any;

    constructor(message: string){
        super(message)
    }


    public getErrorResponse() {
        return {
            status: this.status,
            statuscode: this.statuscode,
            message: this.message,
            }
    }
}

export class BadRequestException extends CustomError {
    status: string = "error";
    statuscode: number = HTTP_STATUS.BAD_REQUEST;

    constructor(message: string) {
        super(message)
    }
}

export class unAuthorizedException extends CustomError {
    status: string = "error";
    statuscode: number = HTTP_STATUS.UNAUTHORIZED;

    constructor(message: string) {
        super(message)
    }
}

export class ForbiddenException extends CustomError {
    status: string = "error";
    statuscode: number = HTTP_STATUS.FORBIDDEN;

    constructor(message: string) {
        super(message)
    }
}

export class NotFoundException extends CustomError {
    status: string = "error";
    statuscode: number = HTTP_STATUS.NOT_FOUND;

    constructor(message: string) {
        super(message)
    }
}