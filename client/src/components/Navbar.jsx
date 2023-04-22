import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Header,
  createStyles,
  Container,
  Group,
  Button,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

const Navbar = () => {
  const [cookies, setCookie] = useCookies(["access_token"]);

  //*MantineUI styles
  const { classes, cx } = useStyles();

  const navigate = useNavigate();

  const logout = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  };

  return (
    <Header height={60}>
      <Container className={classes.header}>
        <Group>
          <img src="vite.svg" alt="Vite logo" height={40} />

          <Link className={cx(classes.link)} to="/">
            <h1>Slow Food Recipes App</h1>
          </Link>
        </Group>

        <Group spacing={5} className={classes.links}>
          <Link className={cx(classes.link)} to="/">
            Home
          </Link>
          <Link className={cx(classes.link)} to="/create-recipe">
            New Recipe
          </Link>
          {!cookies.access_token ? (
            <Button variant="default">
              <Link className={cx(classes.link)} to="/auth">
                Login/Register
              </Link>
            </Button>
          ) : (
            <>
              <Link className={cx(classes.link)} to="/saved-recipes">
                Saved Recipes
              </Link>
              <Button onClick={logout}> Logout </Button>
            </>
          )}
        </Group>
      </Container>
    </Header>
  );
};

export default Navbar;
