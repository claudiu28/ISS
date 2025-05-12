import {RecipeCreateDto, RecipeDto, RecipeReadDto} from "../../../dto/RecipeDtos.ts";

export interface RecipeContextType {
    recipes: RecipeDto[];
    myRecipes: RecipeDto[];
    latestRecipes: RecipeDto[];
    loading: boolean;
    error: string | null;

    getMyRecipes: () => Promise<void>;
    createRecipe: (recipe: RecipeCreateDto) => Promise<RecipeReadDto>;
    getAllRecipes: () => Promise<void>;
    getRecipeById: (id: number) => Promise<RecipeDto | null>;
    getRecipesByName: (name: string) => Promise<RecipeDto[]>;
    getLatestRecipes: (count?: number) => Promise<void>;
    searchRecipes: (keyword: string) => Promise<RecipeDto[]>;
    updateRecipe: (id: number, recipe: RecipeCreateDto) => Promise<RecipeDto>;
    deleteRecipe: (id: number) => Promise<void>;
}