import React from "react";
import { Card, Image, Text, Badge, Group, Button } from "@mantine/core";

const RecipeCard = ({ recipe, isRecipeSaved = () => false, saveRecipe }) => {
  return (
    <Card shadow="sm" padding="lg" withBorder radius="md">
      <Card.Section>
        <a href="#">
          <Image src={recipe.imageUrl} height={180} alt="Recipe image" />
        </a>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} component="a">
          {recipe.name}
        </Text>
        <Badge color="blue" variant="light">
          {recipe.cookingTime} (minutes)
        </Badge>
      </Group>
      <Button
        variant="light"
        color="gray"
        top={10}
        right={10}
        pos={"absolute"}
        onClick={() => saveRecipe(recipe._id)}
        disabled={isRecipeSaved(recipe._id)}
      >
        {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
      </Button>
      <Text>{recipe.description}</Text>
    </Card>
  );
};

export default RecipeCard;
