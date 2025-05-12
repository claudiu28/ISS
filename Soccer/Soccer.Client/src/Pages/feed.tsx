import { useState, useEffect } from "react";
import { Heart, MessageSquare, Share, Plus, Trash2, Filter, Search } from "lucide-react";
import DashboardSidebar from "../Components/dashboards/sidebar.tsx";
import { useRecipe } from "../Hooks/useRecipe";
import { useAuth } from "../Hooks/useAuth";
import {RecipeCreateDto, RecipeDto} from "../../dto/RecipeDtos.ts";

export default function FeedPage() {
    const { recipes, createRecipe, getAllRecipes, deleteRecipe, searchRecipes, error, loading } = useRecipe();
    const { user } = useAuth(); // Get current user
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all"); // all, my-recipes
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);
    const [isSearching, setIsSearching] = useState(false);
    const [newRecipe, setNewRecipe] = useState<RecipeCreateDto>({
        name: "",
        description: "",
        ingredients: [""],
        instructions: [""]
    });

    useEffect(() => {
        getAllRecipes().then();
    }, [getAllRecipes]);

    useEffect(() => {
        const sortedRecipes = [...recipes].sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        filterRecipes(sortedRecipes).then();
    }, [recipes, filterType, searchQuery]);

    const filterRecipes = async (sortedRecipes?: RecipeDto[]) => {
        setIsSearching(true);
        try {
            let filtered = sortedRecipes || [...recipes].sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            if (filterType === "my-recipes" && user) {
                filtered = filtered.filter(recipe => recipe.user?.username === user.username);
            }

            if (searchQuery.trim()) {
                const searchResults = await searchRecipes(searchQuery);
                filtered = filtered.filter(recipe =>
                    searchResults.some(result => result.id === recipe.id)
                );
            }

            setFilteredRecipes(filtered);
        } catch (err) {
            console.error("Error filtering recipes:", err);
        } finally {
            setIsSearching(false);
        }
    };

    const handleDeleteRecipe = async (recipeId: number) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            try {
                await deleteRecipe(recipeId);
                await getAllRecipes();
            } catch (err) {
                console.error("Error deleting recipe:", err);
                alert("Failed to delete recipe. Please try again.");
            }
        }
    };

    const handleCreateRecipe = async () => {
        if (newRecipe.name.trim() && newRecipe.description.trim()) {
            try {
                await createRecipe({
                    ...newRecipe,
                    ingredients: newRecipe.ingredients.filter(i => i.trim() !== ""),
                    instructions: newRecipe.instructions.filter(i => i.trim() !== "")
                });
                setNewRecipe({
                    name: "",
                    description: "",
                    ingredients: [""],
                    instructions: [""]
                });
                setIsDialogOpen(false);
                await getAllRecipes();
            } catch (err) {
                console.error("Error creating recipe:", err);
                alert("Failed to create recipe. Please try again.");
            }
        } else {
            alert("Please fill in the recipe name and description");
        }
    };

    const handleAddIngredient = () => {
        setNewRecipe(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, ""]
        }));
    };

    const handleAddInstruction = () => {
        setNewRecipe(prev => ({
            ...prev,
            instructions: [...prev.instructions, ""]
        }));
    };

    const handleUpdateIngredient = (index: number, value: string) => {
        setNewRecipe(prev => ({
            ...prev,
            ingredients: prev.ingredients.map((ing, i) => i === index ? value : ing)
        }));
    };

    const handleUpdateInstruction = (index: number, value: string) => {
        setNewRecipe(prev => ({
            ...prev,
            instructions: prev.instructions.map((inst, i) => i === index ? value : inst)
        }));
    };

    const handleRemoveIngredient = (index: number) => {
        setNewRecipe(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    const handleRemoveInstruction = (index: number) => {
        setNewRecipe(prev => ({
            ...prev,
            instructions: prev.instructions.filter((_, i) => i !== index)
        }));
    };

    return (
        <>
            <div className="flex">
                <div className="w-64 h-screen sticky top-0">
                    <DashboardSidebar />
                </div>

                <div className="flex-1 p-6">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Recipe Feed</h2>
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Create Recipe
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <input
                                            type="text"
                                            placeholder="Search recipes..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-gray-600" />
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Recipes</option>
                                        <option value="my-recipes">My Recipes</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        {loading || isSearching ? (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                <p className="mt-2 text-gray-600">Loading recipes...</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredRecipes.map((recipe) => (
                                    <div key={recipe.id} className="bg-white rounded-lg shadow border overflow-hidden">
                                        <div className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={recipe.user?.profileImage || "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg"}
                                                    alt={recipe.user?.username}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                                <div>
                                                    <div className="font-medium">{recipe.user?.username || "Unknown User"}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {new Date(recipe.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 pt-0">
                                            <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                                            <p className="text-gray-700 mb-4">{recipe.description}</p>

                                            <div className="mb-4">
                                                <h4 className="font-medium mb-2">Ingredients:</h4>
                                                <ul className="list-disc list-inside text-gray-600">
                                                    {recipe.ingredients.map((ingredient, index) => (
                                                        <li key={index}>{ingredient}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-medium mb-2">Instructions:</h4>
                                                <ol className="list-decimal list-inside text-gray-600">
                                                    {recipe.instructions.map((instruction, index) => (
                                                        <li key={index}>{instruction}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        </div>
                                        <div className="border-t p-4">
                                            <div className="flex w-full justify-between">
                                                {user && recipe.user?.username === user.username ? (
                                                    <button
                                                        onClick={() => handleDeleteRecipe(recipe.id)}
                                                        className="inline-flex items-center justify-center px-2 py-1 rounded text-sm text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        <span>Delete</span>
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button className="inline-flex items-center justify-center px-2 py-1 rounded text-sm text-gray-700 hover:bg-gray-100">
                                                            <Heart className="h-4 w-4 mr-2" />
                                                            <span>Like</span>
                                                        </button>
                                                        <button className="inline-flex items-center justify-center px-2 py-1 rounded text-sm text-gray-700 hover:bg-gray-100">
                                                            <MessageSquare className="h-4 w-4 mr-2" />
                                                            <span>Comment</span>
                                                        </button>
                                                        <button className="inline-flex items-center justify-center px-2 py-1 rounded text-sm text-gray-700 hover:bg-gray-100">
                                                            <Share className="h-4 w-4 mr-2" />
                                                            <span>Share</span>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Create a new recipe</h3>
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <div className="space-y-4 pt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Recipe Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter recipe name"
                                    value={newRecipe.name}
                                    onChange={(e) => setNewRecipe(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Describe your recipe"
                                    value={newRecipe.description}
                                    onChange={(e) => setNewRecipe(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ingredients
                                    </label>
                                    <button
                                        onClick={handleAddIngredient}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        + Add Ingredient
                                    </button>
                                </div>
                                {newRecipe.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder={`Ingredient ${index + 1}`}
                                            value={ingredient}
                                            onChange={(e) => handleUpdateIngredient(index, e.target.value)}
                                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {newRecipe.ingredients.length > 1 && (
                                            <button
                                                onClick={() => handleRemoveIngredient(index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Instructions
                                    </label>
                                    <button
                                        onClick={handleAddInstruction}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        + Add Step
                                    </button>
                                </div>
                                {newRecipe.instructions.map((instruction, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <span className="text-gray-600 pt-2">{index + 1}.</span>
                                        <input
                                            type="text"
                                            placeholder={`Step ${index + 1}`}
                                            value={instruction}
                                            onChange={(e) => handleUpdateInstruction(index, e.target.value)}
                                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {newRecipe.instructions.length > 1 && (
                                            <button
                                                onClick={() => handleRemoveInstruction(index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleCreateRecipe}
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Create Recipe
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}