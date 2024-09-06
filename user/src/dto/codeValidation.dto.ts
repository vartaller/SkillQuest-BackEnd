export class CodeValidationDto {
    isValid: boolean;
    statusCode: number;

    constructor(isValid: boolean, statusCode: number) {
        this.isValid = isValid;
        this.statusCode = statusCode;
    }
}
