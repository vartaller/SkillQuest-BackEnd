export class UserRegisteredDto {
    username: string;
    email: string;
    hashedPassword: string;
    characterId: string | undefined;
}

export class UserLoggedDto {
    id: string;
    token: string;
}
