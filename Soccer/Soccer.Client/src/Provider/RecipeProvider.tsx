import React, {useCallback, useEffect, useState} from "react";
import {RecipeContextType} from "../Context/interfaces/RecipeContextType";
import RecipeService from "../Services/RecipeService";
import {useAuth} from "../Hooks/useAuth";
import {RecipeCreateDto, RecipeDto, RecipeReadDto} from "../../dto/RecipeDtos.ts";
import {RecipeContext} from "../Context/RecipeContext.tsx";

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAuth();
    const [recipes, setRecipes] = useState<RecipeDto[]>([]);
    const [myRecipes, setMyRecipes] = useState<RecipeDto[]>([]);
    const [latestRecipes, setLatestRecipes] = useState<RecipeDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAllRecipes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await RecipeService.getAllRecipes();
            setRecipes(data);
        } catch (err) {
            console.error("Error loading recipes:", err);
        } finally {
            setLoading(false);
        }
    }, []);
   

    const getMyRecipes = useCallback(async () => {
        if (!token) return;

        try {
            setLoading(true);
            setError(null);
            const data = await RecipeService.getMyRecipes();
            setMyRecipes(data);
        } catch (err) {
            console.error("Error loading my recipes:", err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const createRecipe = useCallback(async (recipe: RecipeCreateDto): Promise<RecipeReadDto> => {
        try {
            setLoading(true);
            setError(null);
            const newRecipe = await RecipeService.createRecipe(recipe);

            await getMyRecipes();
            await getAllRecipes();

            return newRecipe;
        } catch (err) {
            console.error("Error creating recipe:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getAllRecipes, getMyRecipes]);

   

    const getRecipeById = useCallback(async (id: number): Promise<RecipeDto | null> => {
        try {
            setError(null);
            return await RecipeService.getRecipeById(id);
        } catch (err) {
            console.error("Error loading recipe:", err);
            return null;
        }
    }, []);

    const getRecipesByName = useCallback(async (name: string): Promise<RecipeDto[]> => {
        try {
            setError(null);
            return await RecipeService.getRecipesByName(name);
        } catch (err) {
            console.error("Error searching recipes:", err);
            return [];
        }
    }, []);

    const getLatestRecipes = useCallback(async (count: number = 5) => {
        try {
            setLoading(true);
            setError(null);
            const data = await RecipeService.getLatestRecipes(count);
            setLatestRecipes(data);
        } catch (err) {
            console.error("Error loading latest recipes:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const searchRecipes = useCallback(async (keyword: string): Promise<RecipeDto[]> => {
        try {
            setError(null);
            return await RecipeService.searchRecipes(keyword);
        } catch (err) {
            console.error("Error searching recipes:", err);
            return [];
        }
    }, []);

    const updateRecipe = useCallback(async (id: number, recipe: RecipeCreateDto): Promise<RecipeDto> => {
        try {
            setLoading(true);
            setError(null);
            const updatedRecipe = await RecipeService.updateRecipe(id, recipe);

            setRecipes(prev => prev.map(r => r.id === id ? updatedRecipe : r));
            setMyRecipes(prev => prev.map(r => r.id === id ? updatedRecipe : r));

            return updatedRecipe;
        } catch (err) {
            console.error("Error updating recipe:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteRecipe = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            await RecipeService.deleteRecipe(id);

            setRecipes(prev => prev.filter(r => r.id !== id));
            setMyRecipes(prev => prev.filter(r => r.id !== id));
            setLatestRecipes(prev => prev.filter(r => r.id !== id));
        } catch (err) {
            console.error("Error deleting recipe:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getMyRecipes().then();
            getAllRecipes().then();
            getLatestRecipes().then();
        }
    }, [getAllRecipes, getLatestRecipes, getMyRecipes, token]);
    
    const value: RecipeContextType = {
        recipes,
        myRecipes,
        latestRecipes,
        loading,
        error,
        getMyRecipes,
        createRecipe,
        getAllRecipes,
        getRecipeById,
        getRecipesByName,
        getLatestRecipes,
        searchRecipes,
        updateRecipe,
        deleteRecipe
    };

    return (
        <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
    );
};