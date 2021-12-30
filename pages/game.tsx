import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Canvas from "./components/game/Canvas";
import ChoiceButton from "./components/game/ChoiceButton";
import Textarea from "./components/game/Textarea";
import Page from "./components/structure/Page";
import Button from "./components/ui/Button";
import Toast from "./components/ui/Toast";
import {
  MultipleChoice,
  Prompt,
  prompts,
  promptTypes,
} from "./constants/prompts";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Question = styled.div`
  width: 100%;
  text-align: center;
  font-size: 40px;
  padding: 20px;
  justify-content: flex-start;
  background-color: black;
  color: white;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Footer = styled.div`
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const humanReadableRound = (round: number) => round + 1;

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

const randomQuestion = (prompt: Prompt): string | MultipleChoice => {
  const selectedPromptArr = prompts[prompt];
  const index = getRandomInt(selectedPromptArr.length);
  const question = selectedPromptArr[index];
  selectedPromptArr.splice(index, 1);
  return question;
};

const Game = (): React.ReactElement => {
  const router = useRouter();
  const [round, setRound] = useState<number>(0);
  const [question, setQuestion] = useState<string | MultipleChoice>("");
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    const nextRound = async () => {
      if (round > 2) {
        await router.push("/score");
        return;
      }
      setQuestion(randomQuestion(promptTypes[round]));
    };
    nextRound();
  }, [round, router]);

  const submitAnswer = useCallback(() => {
    if (promptTypes[round] === "oneSentence" && textAreaValue.length < 10) {
      setToastMessage("Answer must be over 10 characters!");
      return;
    }
    if (promptTypes[round] === "multipleChoice" && !selectedChoice) {
      setToastMessage("Must select answer!");
      return;
    }
    if (round > 2) {
      return;
    }
    setRound((previousRound) => previousRound + 1);
  }, [textAreaValue, selectedChoice, round, setRound]);

  const body = useMemo(() => {
    if (promptTypes[round] === "oneSentence") {
      return (
        <Textarea
          value={textAreaValue}
          onChange={(event) => setTextAreaValue(event.target.value)}
        />
      );
    }
    if (promptTypes[round] === "drawing") {
      return <Canvas setImage={setImage} />;
    }
    return (
      typeof question !== "string" && (
        <ChoiceContainer>
          {question.choices.map((choice) => (
            <ChoiceButton
              key={choice}
              isSelected={selectedChoice === choice}
              onClick={() => setSelectedChoice(choice)}
            >
              {choice}
            </ChoiceButton>
          ))}
        </ChoiceContainer>
      )
    );
  }, [round, question, textAreaValue, selectedChoice]);

  return (
    <Page title={`round ${humanReadableRound(round)}`}>
      <Container>
        <Question>
          <span>Round {humanReadableRound(round)}:</span>{" "}
          {typeof question === "string" ? question : question?.question}
        </Question>
        <Body>{body}</Body>
        <Footer>
          <Button onClick={submitAnswer}>submit</Button>
        </Footer>
      </Container>
      <Toast message={toastMessage} setMessage={setToastMessage} />
    </Page>
  );
};

export default Game;
