import { Button, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import React, { useEffect, useState } from "react";
import ax from "../../api/pokeApi";
import { Layout } from "../../components/layouts";
import { PokeAllResponse, PokeFull } from "../../interfaces";
import confetti from "canvas-confetti";
import { pokeInFavorites, toogleFavorite } from "../../utils";
interface Props {
  poke: PokeFull;
}
const PokeByName: NextPage<Props> = ({ poke }) => {
  const [isInFivorites, setIsInFivorites] = useState(false);

  useEffect(() => {
    setIsInFivorites(pokeInFavorites(poke.id));
  }, [poke.id]);

  const handleClick = () => {
    !isInFivorites && confetti({ particleCount: 400, spread: 100 });
    toogleFavorite(poke.id, poke.name);
    setIsInFivorites(!isInFivorites);
  };

  return (
    <Layout title={`Pokedex | ${poke.name}`}>
      <Container css={{ margin: "auto" }} lg>
        <Grid.Container justify="center">
          <Grid sm={6}>
            <Image
              src={poke.sprites.other?.home.front_default || ""}
              width="100%"
              objectFit="cover"
              alt={poke.name}
            />
          </Grid>

          <Grid sm={6} direction="column" justify="center">
            <Text
              h1
              transform="capitalize"
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
            >
              {poke.name}
            </Text>
            <Text css={{ fontWeight: "bold" }}>Weight:</Text>
            <div style={{ marginLeft: "20px" }}>{poke.weight}</div>

            <Text css={{ fontWeight: "bold" }}>Abilities:</Text>
            <div style={{ marginLeft: "20px" }}>
              {poke.abilities.map((h, idx) => (
                <Text
                  css={{
                    display: "inline",
                    bg: "$gradient",
                    padding: "$2",
                    borderRadius: "$lg",
                  }}
                  key={h.ability.name + idx}
                >
                  {h.ability.name + " "}
                </Text>
              ))}
            </div>

            <Text css={{ fontWeight: "bold" }}>Stats:</Text>
            <div style={{ marginLeft: "20px" }}>
              {poke.stats.map((s, idx) => (
                <Text
                  css={{
                    display: "inline",
                    bg: "$gradient",
                    padding: "$2",
                    borderRadius: "$lg",
                  }}
                  key={s.stat.name + idx}
                >
                  {s.stat.name + " "}
                </Text>
              ))}
            </div>

            <Text css={{ fontWeight: "bold" }}>Sprites:</Text>
            <div style={{ display: "flex" }}>
              <Image src={poke.sprites.back_default || ""} alt={poke.name} />
              <Image src={poke.sprites.back_shiny || ""} alt={poke.name} />
              <Image src={poke.sprites.front_default || ""} alt={poke.name} />
              <Image src={poke.sprites.front_shiny || ""} alt={poke.name} />
            </div>

            <Button
              ghost={isInFivorites}
              color="gradient"
              onClick={handleClick}
            >
              {isInFivorites
                ? "Eliminar de mis favoritos"
                : "A??adir a mis favoritos"}
            </Button>
          </Grid>
        </Grid.Container>
      </Container>
    </Layout>
  );
};

export default PokeByName;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const data = await ax.get<PokeAllResponse>("/pokemon/?limit=100");
  const paths = data.data.results.map(({ name }) => ({
    params: { name },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const poke = await ax.get<PokeFull>(`/pokemon/${name}`);
  return { props: { poke: poke.data } };
};
