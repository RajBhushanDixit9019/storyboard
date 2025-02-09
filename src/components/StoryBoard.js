import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import StoryPoint from "./StoryPoint";
import "../styles/StoryBoard.css";

const StoryBoard = ({ storyPoints, onUpdate }) => {
  return (
    <Droppable droppableId="storyboard">
      {(provided) => (
        <div className="storyboard" ref={provided.innerRef} {...provided.droppableProps}>
          {storyPoints.length === 0 ? (
            <p className="empty-message">Add a story point to get started!</p>
          ) : (
            storyPoints.map((story, index) => (
              <StoryPoint key={story.id} story={story} index={index} onUpdate={onUpdate} />
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default StoryBoard;
