import React from "react";
import useInputs from "./useInputs";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const Info = () => {
  const [state, onChange] = useInputs(reducer, {
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;

  const onChangeName = (e) => {
    onChange(e.target);
  };

  const onChangeNickname = (e) => {
    onChange(e.target);
  };
  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChangeName}></input>
        <input
          name="nickname"
          value={nickname}
          onChange={onChangeNickname}
        ></input>
      </div>
      <div>
        <div>
          <b>name : </b> {name}
        </div>
        <div>
          <b>nickname : </b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
