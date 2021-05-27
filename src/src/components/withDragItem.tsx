import React, { useRef } from 'react'
import { useDrag, useDrop, DragObjectWithType} from "react-dnd";

interface IDragDropItem {
    id: number
    index: number
}

export interface IWithDragDropItemProps {
    type: string,
    dragId: number,
    index: number,
    containerStyle: React.CSSProperties,
    moveDragItem: (dragIndex: number, hoverIndex: number) => void;
}

const withDragDropItem = <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & IWithDragDropItemProps> => ({
    type,
    dragId,
    index,
    containerStyle,
    moveDragItem,
    ...props
  }: IWithDragDropItemProps) => {
    const ref = useRef(null);
    const [, dropRef] = useDrop({
        // Accept will make sure only these element type can be droppable on this element
        accept: type,
        hover(item: DragObjectWithType & IDragDropItem)  {
          if (!ref.current) {
            return;
          }
          const dragIndex = item.index;
          // current element where the dragged element is hovered on
          const hoverIndex = index;
          // If the dragged element is hovered in the same place, then do nothing
          if (dragIndex === hoverIndex) { 
            return;
          }
          // If it is dragged around other elements, then move the image and set the state with position changes
          moveDragItem(dragIndex, hoverIndex);
          /*
            Update the index for dragged item directly to avoid flickering
            when the image was half dragged into the next
          */
          item.index = hoverIndex;
        }
    });

    const [{ isDragging }, dragRef] = useDrag({
            item: { type, dragId, index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
    });  

    dragRef(dropRef(ref));

    return (
        <div ref={ref} style={{ ...containerStyle, opacity: isDragging ? 0 : 1 }}>
            <Component {...props as P} />
        </div>
    )
}

export default withDragDropItem;