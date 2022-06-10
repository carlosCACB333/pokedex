import Head from "next/head";
import React, { FC } from "react";
import { NavBar } from "../ui";

interface Props {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<Props> = ({ children, title = "" }) => {
  return (
    <>
      <Head>
        <title>{title || "PokeDex"}</title>
        <meta name="author" content="Carlos Antonio Castillo Blas" />
        <meta
          name="description"
          content={`Aplicacion de pokemones : ${title}`}
        />
        <meta name="keywords" content={`pokemon,pokedex, ${title}`} />

        {/* meta etiquetas de Open Graph */}

        <meta
          property="og:title"
          content={`Aplicacion de pokemones | ${title}`}
        />
        <meta
          property="og:description"
          content={`Informacion de pokemones | ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  );
};
