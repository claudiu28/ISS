import api from "../API/api.ts";
import {RecipeCreateDto, RecipeDto, RecipeReadDto} from "../../dto/RecipeDtos.ts";

class RecipeService {
    async getMyRecipes(): Promise<RecipeDto[]> {
        const response = await api.get<RecipeDto[]>("/recipe/my-recipes");
        return response.data;
    }

    async createRecipe(recipe: RecipeCreateDto): Promise<RecipeReadDto> {
        const response = await api.post<RecipeReadDto>("/recipe/create-recipe", recipe);
        return response.data;
    }

    async getAllRecipes(): Promise<RecipeDto[]> {
        const response = await api.get<RecipeDto[]>("/recipe/all-recipe");
        return response.data;
    }

    async getRecipeById(id: number): Promise<RecipeDto> {
        const response = await api.get<RecipeDto>(`/recipe/${id}`);
        return response.data;
    }

    async getRecipesByName(name: string): Promise<RecipeDto[]> {
        const response = await api.get<RecipeDto[]>(`/recipe/name/${name}`);
        return response.data;
    }

    async getLatestRecipes(count: number = 5): Promise<RecipeDto[]> {
        const response = await api.get<RecipeDto[]>(`/recipe/latest?count=${count}`);
        return response.data;
    }

    async searchRecipes(keyword: string): Promise<RecipeDto[]> {
        const response = await api.get<RecipeDto[]>(`/recipe/search?keyword=${keyword}`);
        return response.data;
    }

    async updateRecipe(id: number, recipe: RecipeCreateDto): Promise<RecipeDto> {
        const response = await api.put<RecipeDto>(`/recipe/${id}`, recipe);
        return response.data;
    }

    async deleteRecipe(id: number): Promise<void> {
        await api.delete(`/recipe/${id}`);
    }
}

export default new RecipeService();