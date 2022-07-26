import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

import { addDoc, collection } from "firebase/firestore";
import { dbService } from "../../fbase";

interface Props {
  userObject: User;
}

interface ButtonProps {
  item: string;
  deleteGenre(item: string): void;
}

interface newItem {
  id?: string;
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

// Button Component
function GenreButton({ item, deleteGenre }: ButtonProps): JSX.Element {
  useEffect(() => {}, []);

  return (
    <div>
      <b>{item}</b>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm(`${item}을 삭제하시겠습니까?`)) {
            deleteGenre(item);
          }
        }}
      >
        X
      </button>
    </div>
  );
}

function AuctionEdit({ userObject }: Props): JSX.Element {
  const navigate = useNavigate();
  const userEmail: string | null = userObject.email;

  const [genresList, setGenresList] = useState<string[] | undefined>([]);
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
    setGenresList((prev) => {
      if (prev) {
        if (!prev.includes(selected)) {
          return [...prev, selected];
        } else {
          return [...prev];
        }
      } else {
        return [selected];
      }
    });
  };

  const deleteGenre = (item: any) => {
    setGenresList((prev) => {
      const newGenreList = prev?.filter((genre) => genre !== item);
      return newGenreList;
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const newAuction = await addDoc(collection(dbService, "auction"), {
      title: newItem.title,
      price: newItem.price,
      nickname: userEmail,
      genres: genresList,
      material: newItem.material,
      detail: newItem.detail,
      createdAt: Date.now(),
    });

    setNewItem(defaultItem);
    navigate(`/auction/${newAuction.id}`);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Auction Create</h1>
      <form onSubmit={onSubmit}>
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
        {genresList &&
          genresList.map((item, i) => (
            <div key={i}>
              <GenreButton deleteGenre={deleteGenre} item={item}></GenreButton>
            </div>
          ))}
        <select
          name="genres"
          id="genres"
          onChange={selectGenres}
          defaultValue=""
        >
          <option value="" disabled>
            선택
          </option>
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
