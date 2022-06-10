import { Grid, Text } from "@nextui-org/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts/Layout";
import { PokeCard } from "../../components/ui/PokeCard";
import { MediumPoke } from "../../interfaces/poke";
import { getFavorites } from "../../utils/favorites";

const FavoriteFage: NextPage = () => {
  const [pokes, setPokes] = useState<MediumPoke[]>([]);
  useEffect(() => {
    setPokes(getFavorites());
  }, []);

  return (
    <Layout title="Pokedex | favoritos">
      <Text
        h1
        css={{
          textAlign: "center",
          margin: "1% 0",
          textGradient: "45deg, $blue600 45%, $pink600 55%",
        }}
      >
        Mis favoritos
      </Text>
      <Grid.Container gap={1} justify="center">
        {pokes.length == 0 ? (
          <Text h2 css={{ opacity: "0.5" }} color="warning">
            No hay favoritos!!
          </Text>
        ) : (
          pokes.map((poke) => (
            <Grid
              key={poke.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              css={{ w: "100%" }}
            >
              <PokeCard poke={poke} isParamName />
            </Grid>
          ))
        )}
      </Grid.Container>
    </Layout>
  );
};

export default FavoriteFage;
