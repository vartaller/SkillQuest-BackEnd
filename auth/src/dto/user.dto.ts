export class UserRegisteredDto {
    id: string;
    username: string;
    email: string;
    hashedPassword: string;
    token: string;
}

export class UserLoggedDto {
    id: string;
    token: string;
}
