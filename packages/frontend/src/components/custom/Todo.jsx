import React from "react";
import { ModeToggle } from "../mode-toggle";
function Todo() {
  return (
    <div className="grid md:grid-cols-3 2xl:grid-cols-1 lg:grid-cols-2 sm:grid-cols-4 ">
      Todo
      <ModeToggle />
      <div className="bg-orange-300">Div1</div>
      <div className="bg-orange-400">Div2</div>
      <div className="bg-orange-300">Div3</div>
      <div className="bg-orange-400">Div4</div>
    </div>
  );
}

export default Todo;
