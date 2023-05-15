import { useEffect, useState } from "react";
import { Container, Grid, Title } from "@mantine/core";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import RecipeCard from "../components/RecipeCard";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const getSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    getSavedRecipes();
  }, []);

  return (
    <div>
      <h2>Saved Recipes</h2>
      <Grid grow>
        {savedRecipes.map((recipe) => (
          <Grid.Col key={recipe._id} span={4} md={6} lg={4}>
            <RecipeCard recipe={recipe} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default SavedRecipes;
