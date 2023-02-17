import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const KanbanItem = ({ task, index }) => {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
            <div className='kanban-item'
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <h4>{task.title}</h4>
                <p>{task.description}</p>
            </div>
                    )}
            </Draggable>
     );
 };
            


export default KanbanItem;
