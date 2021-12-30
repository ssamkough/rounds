import Head from "next/head";
import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  children: React.ComponentProps<"div">["children"];
  title: string;
}

const backgroundColor = keyframes`
0% {
  background-color: #FFFFFF;
}

10% {
  background-color: #FFCCE5;
}

30% {
  background-color: #E5CCFF;
}

50% {
  background-color: #CCE5FF;
}

70% {
  background-color: #CCFFE5;
}

90% {
  background-color: #FFFFCC;
}
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url("/grass-tile.png") center fixed;
  background-size: 256px;
`;

const Page = ({ children, title }: Props): React.ReactElement => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/png" href="/favicon.ico" />
    </Head>
    <Container>{children}</Container>
  </>
);

export default Page;
