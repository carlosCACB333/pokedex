import { useTheme as useNextTheme } from "next-themes";
import { Link as LK, Row, Switch, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { MoonIcon, SunIcon } from "./Icons";

export const NavBar = () => {
  const { isDark } = useTheme();
  const { setTheme } = useNextTheme();
  return (
    <>
      <Row
        as="nav"
        css={{
          padding: "0 3%",
        }}
        justify="space-between"
        align="center"
      >
        <Link href="/">
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
              alt="Imagen pikachu"
              height="70px"
              width="70px"
            />

            <Text
              h2
              css={{
                fontWeight: "bold",
                textGradient: "45deg, $blue600 20%, $pink600 60%",
              }}
            >
              PokeDex
            </Text>
          </div>
        </Link>

        <Link href="/favoritos" passHref>
          <LK css={{ fontWeight: "bold" }}>Mis favoritos</LK>
        </Link>

        <Switch
          defaultChecked
          color="secondary"
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          icon={isDark ? <SunIcon /> : <MoonIcon />}
          animated={false}
        />
      </Row>
    </>
  );
};
