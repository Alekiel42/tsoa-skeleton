//to delete, it is just an example
export interface ModelExample {
    id: number;
    name: string;
    role: Role;
    games: String[];
}

export enum Role {
    ADMIN = "admin",
    PLAYER = "player",
    READER = "reader"
}