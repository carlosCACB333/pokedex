import { Grid, Text } from "@nextui-org/react";
import type { GetStaticProps, NextPage } from "next";
import ax from "../api/pokeApi";
import { Layout } from "../components/layouts";
import { PokeCard } from "../components/ui/PokeCard";
import { MediumPoke, PokeAllResponse, SmollPoke } from "../interfaces";
interface Props {
  pokes: MediumPoke[];
}
const HomePage: NextPage<Props> = ({ pokes }) => {
  return (
    <Layout>
      <Text
        h1
        css={{
          textAlign: "center",
          margin: "1% 0",
          textGradient: "45deg, $blue600 45%, $pink600 55%",
        }}
      >
        Lista de pokemones
      </Text>
      <Grid.Container gap={1}>
        {pokes.map((poke) => (
          <Grid key={poke.id} xs={12} sm={6} md={4} lg={3} css={{ w: "100%" }}>
            <PokeCard poke={poke} />
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await ax.get<PokeAllResponse>("/pokemon/?limit=100");

  const pokes: MediumPoke[] = data.data.results.map(({ name }, idx) => ({
    name,
    id: idx + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      idx + 1
    }.svg`,
  }));
  return { props: { pokes } };
};
