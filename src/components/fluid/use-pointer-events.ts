"use client";

import { useEffect, useRef } from "react";
import { Vector2 } from "three";

export interface SplatData {
  mouseX: number;
  mouseY: number;
  velocityX: number;
  velocityY: number;
}

export function usePointerEvents(
  containerRef: React.RefObject<HTMLElement | null>,
  size: { width: number; height: number },
  force: number
) {
  const splatStack = useRef<SplatData[]>([]);
  const lastMouse = useRef(new Vector2());
  const hasMoved = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handlePointerMove = (event: PointerEvent | TouchEvent) => {
      const clientX =
        "clientX" in event
          ? event.clientX
          : event.touches?.[0]?.clientX;
      const clientY =
        "clientY" in event
          ? event.clientY
          : event.touches?.[0]?.clientY;

      if (clientX === undefined || clientY === undefined) return;

      const deltaX = clientX - lastMouse.current.x;
      const deltaY = clientY - lastMouse.current.y;

      if (!hasMoved.current) {
        hasMoved.current = true;
        lastMouse.current.set(clientX, clientY);
        return;
      }

      lastMouse.current.set(clientX, clientY);

      splatStack.current.push({
        mouseX: clientX / size.width,
        mouseY: 1.0 - clientY / size.height,
        velocityX: deltaX * force,
        velocityY: -deltaY * force,
      });
    };

    element.addEventListener("pointermove", handlePointerMove as EventListener, {
      passive: true,
    });
    element.addEventListener("touchmove", handlePointerMove as EventListener, {
      passive: true,
    });

    return () => {
      element.removeEventListener(
        "pointermove",
        handlePointerMove as EventListener
      );
      element.removeEventListener(
        "touchmove",
        handlePointerMove as EventListener
      );
    };
  }, [containerRef, size.width, size.height, force]);

  return splatStack;
}
