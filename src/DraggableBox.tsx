import { CSSProperties, useEffect } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "./Container";
import "./main.css";

type DraggableBoxProps = {
  id: string;
  showEmptyPlaceholder: boolean;
  item: {
    title: string;
    left: number;
    top: number;
  };
}

function getDraggableBoxStyles(
  left: number,
  top: number,
  isDragging: boolean
): CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : ""
  };
}

export const DraggableBox=({ id, showEmptyPlaceholder, item }: DraggableBoxProps) => {
  const { title, left, top } = item;
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.BOX,
    item: { type: ItemTypes.BOX, id, left, top, title },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  useEffect(() => {
    if (showEmptyPlaceholder) {
      preview(getEmptyImage(), { captureDraggingState: true });
    }
  }, [showEmptyPlaceholder, preview]);

  return (
    <div
      ref={drag}
      className="dragitem"
      style={getDraggableBoxStyles(left, top, isDragging)}
    >
      {title}
    </div>
  );
}