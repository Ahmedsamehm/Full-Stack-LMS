export class UsersResponseDto {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
