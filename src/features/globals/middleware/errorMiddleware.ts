import { string } from "joi";
import { HTTP_STATUS } from "../constants/http";

export abstract class CustomError extends Error {
    abstract staus: string;
    abstract statuscode: number;

    constructor(message: string){
        super(message)
    }
}

export class BadRequestException extends CustomError {
    staus: string = "error";
    statuscode: number = HTTP_STATUS.BAD_REQUEST;

    constructor(message: string) {
        super(message)
    }
}

export class unAuthorizedException extends CustomError {
    staus: string = "error";
    statuscode: number = HTTP_STATUS.UNAUTHORIZED;

    constructor(message: string) {
        super(message)
    }
}

export class ForbiddenException extends CustomError {
    staus: string = "error";
    statuscode: number = HTTP_STATUS.FORBIDDEN;

    constructor(message: string) {
        super(message)
    }
}

export class NotFoundException extends CustomError {
    staus: string = "error";
    statuscode: number = HTTP_STATUS.NOT_FOUND;

    constructor(message: string) {
        super(message)
    }
}