export interface RecipeCreateDto {
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
}

export interface RecipeReadDto {
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    username: string;
    createdAt: Date;
}

export interface RecipeDto {
    id: number;
    userId: number;
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    createdAt: Date;
    user?: {
        id: number;
        username: string;
        profileImage?: string;
    };
}