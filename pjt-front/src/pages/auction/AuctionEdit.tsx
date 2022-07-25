import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

interface Props {
  userObject: User;
}

interface newItem {
  id?: number;
  title: string;
  price: number;
  nickname: string;
  genres: Array<string>;
  material: string;
  detail: string;
}

const defaultItem: newItem = {
  title: "",
  price: 0,
  nickname: "",
  genres: [],
  material: "",
  detail: "",
};

function AuctionEdit({ userObject }: Props): JSX.Element {
  const navigate = useNavigate();
  const userEmail: string | null = userObject.email;

  const [genresList, setGenresList] = useState<string[]>(["안녕", "메롱"]);
  const [newItem, setNewItem] = useState<newItem>(defaultItem);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setNewItem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const selectGenres = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected: string = e.target.value;
    setGenresList((prev) => [...prev, selected]);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h1>AuctionEdit</h1>
      <form>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={newItem.title || ""}
          onChange={onChange}
          required
        />
        <br />
        <input
          name="price"
          type="number"
          placeholder="price"
          min="0"
          step="1000"
          value={newItem.price}
          onChange={onChange}
          required
        />
        <br />
        {genresList.map((item, i) => (
          <p key={i}>
            {item}
            {/* <button value={item} onClick={onDeleteGenre}>
              X
            </button> */}
          </p>
        ))}
        <select name="genres" id="genres" onChange={selectGenres}>
          <option value="빨강">빨강</option>
          <option value="주황">주황</option>
          <option value="노랑">노랑</option>
          <option value="초록">초록</option>
          <option value="파랑">파랑</option>
        </select>
        <br />
        <input
          name="material"
          type="text"
          placeholder="material"
          value={newItem.material || ""}
          onChange={onChange}
          required
        />
        <br />
        <textarea
          name="detail"
          cols={30}
          rows={10}
          placeholder="detail"
          value={newItem.detail || ""}
          onChange={onChange}
        ></textarea>
        <br />
        <input type="submit" value="작성" />
      </form>
    </div>
  );
}

export default AuctionEdit;
