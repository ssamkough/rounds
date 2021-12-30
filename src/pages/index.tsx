import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Page from "../components/structure/Page";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Toast from "../components/ui/Toast";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Title = styled.span`
  font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif;
  font-size: 5em;
  color: white;
  -webkit-text-stroke: 2px #000000;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const HomeButton = styled(Button)`
  width: 150px;
  flex-wrap: wrap;
`;

const Home = (): React.ReactElement => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  // const [room, setRoom] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");

  // const sendToast = useCallback(() => {
  //   let missingInputs = "";
  //   if (!username) {
  //     missingInputs += "username";
  //   }
  //   if (!room) {
  //     missingInputs += (!username ? " and " : "") + "room";
  //   }
  //   setToastMessage(`Need to enter ${missingInputs}!`);
  // }, [room, username]);

  const joinRoom = useCallback(async () => {
    if (!username) {
      setToastMessage(`Need to enter username!`);
      return;
    }
    await router.push("/game");
  }, [username, router]);

  // const createRoom = useCallback(() => {
  //   if (!username || !room) {
  //     sendToast();
  //     return;
  //   }
  //   router.push("/game");
  // }, [username, room, sendToast, router]);

  return (
    <Page title="rounds">
      <Container>
        <Title>rounds</Title>
        <InputContainer>
          <Input
            placeholder="enter your name"
            value={username}
            onChange={(event) => setUsername(event.target.value.trim())}
          />
          {/* <Input
            placeholder="enter room name"
            value={room}
            onChange={(event) => setRoom(event.target.value.trim())}
          /> */}
        </InputContainer>
        <ButtonContainer>
          <HomeButton onClick={joinRoom}>start</HomeButton>
          {/* <HomeButton onClick={createRoom}>create</HomeButton> */}
        </ButtonContainer>
      </Container>
      <Toast message={toastMessage} setMessage={setToastMessage} />
    </Page>
  );
};

export default Home;
