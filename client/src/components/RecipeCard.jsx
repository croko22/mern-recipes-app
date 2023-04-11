import React from "react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  createStyles,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

const RecipeCard = ({ recipe }) => {
  const { classes, cx } = useStyles();

  return (
    <Card withBorder radius="md" className={cx(classes.card)}>
      <Card.Section>
        <a href="#">
          <Image src={recipe.imageUrl} height={180} />
        </a>
      </Card.Section>

      <Text className={classes.title} fw={500} component="a">
        {recipe.name}
      </Text>

      <Text fz="sm" color="dimmed" lineClamp={4}>
        {recipe.description}
      </Text>
    </Card>
  );
};

export default RecipeCard;
