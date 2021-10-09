import React from "react";
import S from "./Filter.module.css";

interface PropsType {
  filterValue: string;
  handleChangeFilter: any;
}

const Filter: React.FC<PropsType> = ({ filterValue, handleChangeFilter }) => {
  return (
    <div>
      <label className={S.caption}>Find contacts by name</label>
      <input
        type="text"
        name="filter"
        className={S.input}
        value={filterValue}
        onChange={handleChangeFilter}
      />
    </div>
  );
};
export default Filter;
