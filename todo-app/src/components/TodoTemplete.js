import React from 'react';
import './TodoTemplete.scss';

const TodoTemplete = ({ children }) => {
  return (
    <div className="TodoTemplete">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplete;
