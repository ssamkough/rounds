import React from "react";
import styled from "styled-components";
import Page from "../components/structure/Page";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 100px;
  border-radius: 16px;
`;

const Score = (): React.ReactElement => (
  <Page title="score">
    <Container>
      <ScoreBox>Score: ???</ScoreBox>
    </Container>
  </Page>
);

export default Score;
