import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { DraggableBox } from "./DraggableBox";
import "./main.css";

type DragItem = {
  id: string;
  type: string;
  left: number;
  top: number;
}

type BoxMap = {
  [key: string]: { top: number; left: number; title: string };
}

export const ItemTypes = { BOX: "box" };

export const Container = () => {
  const [boxes, setBoxes] = useState<BoxMap>({
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" }
  });
  const [showEmptyPlaceholder, setShowEmptyPlaceholder] = useState(false);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(update(boxes, { [id]: { $merge: { left, top } } }));
    },
    [boxes]
  );

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item: DragItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
        y: number;
      };

      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);

      moveBox(item.id, left, top);
      return undefined;
    }
  });

  return (
    <>
      <div ref={drop} className="dragcontainer">
        {Object.keys(boxes).map(key => (
          <DraggableBox
            key={key}
            id={key}
            item={boxes[key]}
            showEmptyPlaceholder={showEmptyPlaceholder}
          />
        ))}
      </div>

      <input
        id="placeholder"
        type="checkbox"
        checked={showEmptyPlaceholder}
        onChange={() => setShowEmptyPlaceholder(!showEmptyPlaceholder)}
      />
      <label htmlFor="placeholder">Show empty placeholder during drag</label>
    </>
  );
}