import React from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

const withDragContainer = <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P> => (props : P) => 
    <DndProvider backend={HTML5Backend}><Component {...props as P} /></DndProvider>;

export default withDragContainer;