import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Item } from "../../Interface";

import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../../fbase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

interface editItem {
  title: string;
  price: number;
  // genres: Array<string>;
  material: string;
  detail: string;
}

const defaultItem: Item = {
  imageUrl: "",
  id: "",
  title: "",
  price: 0,
  nickname: "",
  genres: [],
  material: "",
  detail: "",
  createdAt: new Date(),
  like: [],
  viewCount: 0,
  comments: [],
};

interface ButtonProps {
  item: string;
  deleteGenre(item: string): void;
}

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

function AuctionDetail(): JSX.Element {
  const navigate = useNavigate();

  const params = useParams();
  const address = params.id;
  const [item, setItem] = useState<Item | any>(defaultItem);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [genresList, setGenresList] = useState<string[]>();
  const [editItem, setEditItem] = useState<editItem>({
    title: item.title,
    price: item.price,
    // genres: item.genres,
    material: item.material,
    detail: item.detail,
  });
  const [imgUrl, setImgUrl] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setEditItem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onFileChange = (e: any) => {
    const { files } = e.target;
    const file = files[0];
    setImage(file);

    const render = new FileReader();
    render.onload = (finishedEvent: any) => {
      const { result } = finishedEvent.currentTarget;
      setImgUrl(result);
    };

    render.readAsDataURL(file);
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

  const onListClick = () => {
    navigate("/auction");
  };

  const onEditClick = () => {
    setOnEdit(!onEdit);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl: string = "";

    if (image) {
      const imgRef = ref(storageService, `${item.nickname}/${uuidv4()}`);
      const response = await uploadBytes(imgRef, image);
      imageUrl = await getDownloadURL(response.ref);
    }

    await updateDoc(doc(dbService, `auction/${address}`), {
      imageUrl: imageUrl,
      title: editItem.title,
      price: editItem.price,
      genres: genresList,
      material: editItem.material,
      detail: editItem.detail,
    });

    const updateValue = await getDoc(doc(dbService, `auction/${address}`));
    const newData = updateValue.data();

    setItem({
      ...newData,
      id: address,
    });

    setOnEdit(!onEdit);
  };

  const onClearImg = () => {
    setImgUrl("");
    setImage(null);
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm("삭제하시겠습니까?");
    if (del) {
      await deleteDoc(doc(dbService, `auction/${address}`));
      if (item.imageUrl !== "") {
        const imgRef = ref(storageService, item.imageUrl);
        await deleteObject(imgRef);
      }
      navigate("/auction");
    }
  };

  useEffect(() => {
    async function loadData() {
      const data = await getDoc(doc(dbService, `auction/${address}`));
      const newData = data.data();

      setItem({
        ...newData,
        id: address,
        // like: [],
        // viewCount: 0,
        // comments: [],
      });
    }

    if (address) {
      loadData();
    } else {
      navigate("/notice");
    }
  }, [address, navigate]);

  useEffect(() => {
    setEditItem({
      title: item.title,
      price: item.price,
      // genres: genresList,
      material: item.material,
      detail: item.detail,
    });

    setGenresList(item.genres);
    setImgUrl(item.imageUrl);
  }, [onEdit, item]);

  return (
    <div>
      {onEdit ? (
        <div>
          <h1>Auction Create</h1>
          <form onSubmit={onSubmit}>
            <input type="file" accept="image/*" onChange={onFileChange} />
            {imgUrl && (
              <div>
                <img src={imgUrl} alt="미리보기" width="30%" height="30%" />
                <button onClick={onClearImg}>취소</button>
              </div>
            )}
            <br />
            <input
              name="title"
              type="text"
              placeholder="title"
              value={editItem.title || ""}
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
              value={editItem.price}
              onChange={onChange}
              required
            />
            <br />
            {genresList &&
              genresList.map((item, i) => (
                <div key={i}>
                  <GenreButton
                    deleteGenre={deleteGenre}
                    item={item}
                  ></GenreButton>
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
              value={editItem.material || ""}
              onChange={onChange}
              required
            />
            <br />
            <textarea
              name="detail"
              cols={30}
              rows={10}
              placeholder="detail"
              value={editItem.detail || ""}
              onChange={onChange}
            ></textarea>
            <br />
            <input type="submit" value="작성" />
          </form>
        </div>
      ) : (
        <div>
          <h1>AuctionDetail</h1>
          {item.imageUrl && (
            <img src={item.imageUrl} alt="image" width="30%" height="30%" />
          )}
          <h2>{item.title}</h2>
          <p>작성자 : {item.nickname}</p>
          <p>가격 : {item.price}원</p>
          <p>
            장르 :{" "}
            {item.genres.map((item: string, i: number) => (
              <span key={i}>{item} </span>
            ))}
          </p>
          <p>재료 : {item.material}</p>
          <p>{item.detail}</p>
          <button onClick={onEditClick}>수정</button>
          <button onClick={onDeleteClick}>삭제</button>
          <button onClick={onListClick}>목록</button>
        </div>
      )}
    </div>
  );
}

export default AuctionDetail;
