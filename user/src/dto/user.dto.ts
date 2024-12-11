export class UserRegisteredDto {
    id: string;
    username: string;
    email: string;
    hashedPassword: string;
    characterId: string | undefined;
}

export class UserLoggedDto {
    id: string;
    token: string;
}
