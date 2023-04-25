import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm } from "@mantine/form";
import {
  TextInput,
  NumberInput,
  Container,
  Button,
  Group,
  Textarea,
  Text,
  Title,
  Flex,
} from "@mantine/core";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const recipe = useForm({
    initialValues: {
      name: "",
      description: "",
      ingredients: [""],
      instructions: "",
      imageUrl: "",
      cookingTime: 0,
      userOwner: userID,
    },
  });

  const navigate = useNavigate();

  const handleAddIngredient = () => {
    recipe.insertListItem("ingredients", "");
  };

  const onSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/recipes`,
        recipe.values,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert("Recipe created");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title>Create Recipe</Title>
      <form onSubmit={recipe.onSubmit(onSubmit)}>
        <TextInput
          label="Name"
          placeholder="Name"
          {...recipe.getInputProps("name")}
        />
        <Textarea
          label="Description"
          placeholder="Describe your recipe here"
          {...recipe.getInputProps("description")}
        />
        <Text>Ingredients</Text>
        <Flex
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="wrap"
          gap="md"
        >
          <Flex
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
            gap="md"
          >
            {recipe.values.ingredients.map((_, index) => (
              <Group key={index}>
                <TextInput
                  placeholder="Ingredient"
                  {...recipe.getInputProps(`ingredients.${index}`)}
                  rightSection={
                    // TODO: Improve the styling of this button
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        recipe.removeListItem("ingredients", index);
                      }}
                    >
                      X
                    </button>
                  }
                />
              </Group>
            ))}
          </Flex>
          <Button color="gray" onClick={handleAddIngredient}>
            + Add Ingredient 🍕 🍔 🍟
          </Button>
        </Flex>
        <Textarea
          label="Instructions"
          placeholder="Write the instructions here"
          {...recipe.getInputProps("instructions")}
        />
        <TextInput
          placeholder="Image URL"
          label="Image URL"
          {...recipe.getInputProps("imageUrl")}
        />
        <NumberInput
          defaultValue={30}
          label="Cooking Time (minutes)"
          placeholder="Cooking Time"
          {...recipe.getInputProps("cookingTime")}
        />
        <Button type="submit">Create Recipe</Button>
      </form>
    </Container>
  );
};

export default CreateRecipe;
