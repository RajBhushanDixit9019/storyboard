import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Header from "./components/Header";
import StoryBoard from "./components/StoryBoard";
import "./App.css";
import initialData from "./data";

const App = () => {
  const [storyPoints, setStoryPoints] = useState(initialData);

  // Handle Drag-and-Drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...storyPoints];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setStoryPoints(items);
  };

  // Add New Story Point
  const addStoryPoint = () => {
    const newStory = {
      id: Date.now().toString(),
      content: "New story point",
    };
    setStoryPoints([...storyPoints, newStory]);
  };

  // Update Story Point Content
  const updateStoryPoint = (id, newContent) => {
    setStoryPoints((prev) =>
      prev.map((story) => (story.id === id ? { ...story, content: newContent } : story))
    );
  };

  return (
    <div className="container">
      <Header />
      <button className="add-btn" onClick={addStoryPoint}>+ Add Story Point</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <StoryBoard storyPoints={storyPoints} onUpdate={updateStoryPoint} />
      </DragDropContext>
    </div>
  );
};

export default App;
