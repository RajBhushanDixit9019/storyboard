import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import "../styles/StoryPoint.css";

const StoryPoint = ({ story, index, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(story.content);

  // Enable editing mode on double click
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // Handle text input change
  const handleChange = (e) => {
    setNewContent(e.target.value);
  };

  // Save the changes when the user presses Enter or clicks outside
  const handleBlur = () => {
    if (newContent.trim() === "") {
      setNewContent(story.content); // Restore previous content if input is empty
    } else {
      onUpdate(story.id, newContent); // Save updated content
    }
    setIsEditing(false);
  };

  // Save the changes when the user presses Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <Draggable draggableId={story.id} index={index}>
      {(provided) => (
        <div
          className="story-point"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={handleDoubleClick}
        >
          {isEditing ? (
            <input
              type="text"
              value={newContent}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="story-input"
            />
          ) : (
            newContent
          )}
        </div>
      )}
    </Draggable>
  );
};

export default StoryPoint;
