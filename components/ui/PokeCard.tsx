import { Button, Card, Col, Row, Text } from "@nextui-org/react";
import React, { FC } from "react";
import { MediumPoke } from "../../interfaces";
import { useRouter } from "next/router";
interface Props {
  poke: MediumPoke;
  isParamName?: boolean;
}
export const PokeCard: FC<Props> = ({
  poke,
  isParamName: isParamName = false,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(isParamName ? `/name/${poke.name}` : `/pokemon/${poke.id}`);
  };
  return (
    <Card css={{ w: "100%", h: "400px" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={16} weight="bold" transform="uppercase" color="#ffffffAA">
            # {poke.id}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={poke.img}
          width="100%"
          height="100%"
          objectFit="cover"
          alt={poke.name}
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text h3 color="black">
              {poke.name}
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button flat rounded color="secondary" onClick={handleClick}>
                Más información
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
