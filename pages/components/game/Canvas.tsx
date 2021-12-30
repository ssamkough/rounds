import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Button from "../ui/Button";

interface Props {
  setImage: Dispatch<SetStateAction<string>>;
}

interface Coordinate {
  x: number;
  y: number;
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Board = styled.canvas`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
  background-color: white;
  border: 1px solid black;
`;

const Palette = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  border-radius: 8px;
`;

const ColoredButton = styled(Button)<{ $backgroundColor: string }>`
  width: 40px;
  height: 40px;
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor && $backgroundColor};

  &:hover {
    background-color: ${({ $backgroundColor }) =>
      $backgroundColor && $backgroundColor};
    opacity: 0.7;
  }
`;

const Eraser = styled(Button)`
  background-color: #f69f9c;
  width: 100px;
  height: 40px;
  transform: skew(-20deg);

  &:hover {
    background-color: #f69f9c;
    opacity: 0.7;
  }
`;

const Canvas = ({ setImage }: Props): React.ReactElement => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [position, setPosition] = useState<Coordinate | null>(null);
  const [color, setColor] = useState<string>("#000000");

  const resize = useCallback(() => {
    if (!ctx || typeof window === "undefined") {
      return;
    }
    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = CANVAS_HEIGHT;
  }, [ctx]);

  const draw = useCallback(
    (event: MouseEvent) => {
      if (!ctx || !position || typeof window === "undefined") {
        return;
      }
      // mouse left button must be pressed
      if (event.buttons !== 1) return;

      ctx.beginPath(); // begin

      ctx.lineWidth = 20;
      ctx.lineCap = "round";
      ctx.strokeStyle = color;

      ctx.moveTo(position.x, position.y); // from
      setPosition({
        x: event.clientX - ctx.canvas.offsetLeft,
        y: event.clientY - ctx.canvas.offsetTop,
      });
      ctx.lineTo(position.x, position.y); // to

      ctx.stroke(); // draw it!
      setImage(
        ctx.canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
    },
    [ctx, position, color, setImage]
  );

  const clearCanvas = useCallback(() => {
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, [ctx]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setCtx(ref.current.getContext("2d"));
    resize();
  }, [ref, resize]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    document.addEventListener("mousemove", draw);
    return () => {
      document.removeEventListener("mousemove", draw);
    };
  }, [draw]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    document.addEventListener("mousedown", setPosition);
    return () => {
      document.removeEventListener("mousedown", setPosition);
    };
  }, [setPosition]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    document.addEventListener("mouseenter", setPosition);
    return () => {
      document.removeEventListener("mouseenter", setPosition);
    };
  }, [setPosition]);

  return (
    <Container>
      <Board ref={ref} />
      <Palette>
        <ColoredButton
          $backgroundColor="#000000"
          onClick={() => setColor("#000000")}
        />
        <ColoredButton
          $backgroundColor="#FF0000"
          onClick={() => setColor("#FF0000")}
        />
        <ColoredButton
          $backgroundColor="#FFAB0F"
          onClick={() => setColor("#FFAB0F")}
        />
        <ColoredButton
          $backgroundColor="#048243"
          onClick={() => setColor("#048243")}
        />
        <ColoredButton
          $backgroundColor="#247AFD"
          onClick={() => setColor("#247AFD")}
        />
        <Eraser onClick={() => setColor("#FFFFFF")} />
        <Button onClick={clearCanvas}>clear</Button>
      </Palette>
    </Container>
  );
};

export default Canvas;
