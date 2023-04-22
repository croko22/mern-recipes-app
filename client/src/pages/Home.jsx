import { useEffect, useState } from "react";
import { Container, Grid, Title } from "@mantine/core";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { useGetUserID } from "../hooks/useGetUserID";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/recipes`
        );
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    getRecipes();
    getSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/recipes`,
        {
          recipeID,
          userID,
        }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <Container size={{ base: "sm", md: "lg" }} padding="md">
      <Title>Recipes</Title>
      <Grid grow>
        {recipes.map((recipe) => (
          <Grid.Col key={recipe._id} span={4} md={6} lg={4}>
            <RecipeCard
              saveRecipe={saveRecipe}
              isRecipeSaved={isRecipeSaved}
              recipe={recipe}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
