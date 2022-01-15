import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './Container';
import { TouchBackend } from 'react-dnd-touch-backend';
import { CustomDragLayer } from './CustomDragLayer';

function App() {
  return (
    <div>
      <DndProvider backend={TouchBackend}>
        <Container />
        <CustomDragLayer />
      </DndProvider>
    </div>
  );
}

export default App;
