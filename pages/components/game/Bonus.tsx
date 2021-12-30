import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const Board = styled.canvas`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
  background-color: white;
  border: 1px solid black;
`;

const Bonus = (): React.ReactElement => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const resize = useCallback(() => {
    if (!ctx || typeof window === "undefined") {
      return;
    }
    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = CANVAS_HEIGHT;
  }, [ctx]);

  const drawCircle = useCallback(() => {
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // the circle
    ctx.beginPath();
    ctx.arc(100 + delta.x, 100 + delta.y, 10, 0, 2 * Math.PI);
    ctx.closePath();

    // the outline
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    // the fill color
    ctx.fillStyle = "#FF0000";
    ctx.fill();
  }, [ctx, delta]);

  const moveCircle = useCallback(
    (e) => {
      switch (e.keyCode) {
        case 37:
          // left key pressed
          setDelta({ x: delta.x - 10, y: delta.y });
          break;
        case 38:
          // up key pressed
          setDelta({ x: delta.x, y: delta.y - 10 });
          break;
        case 39:
          // right key pressed
          setDelta({ x: delta.x + 10, y: delta.y });
          break;
        case 40:
          // down key pressed
          setDelta({ x: delta.x, y: delta.y + 10 });
          break;
      }
      e.preventDefault();
      drawCircle();
    },
    [delta, drawCircle]
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setCtx(ref.current.getContext("2d"));
    resize();
    drawCircle();
  }, [ref, resize, drawCircle]);

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
    document.addEventListener("keydown", moveCircle, false);
    return () => {
      document.removeEventListener("keydown", moveCircle, false);
    };
  }, [moveCircle]);

  return <Board ref={ref} />;
};

export default Bonus;
