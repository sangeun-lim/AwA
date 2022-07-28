import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "../../fbase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// interface Props {
//   userObject: User;
// }

interface ButtonProps {
  item: string;
  deleteGenre(item: string): void;
}

interface newItem {
  id?: string;
  imageUrl: Array<string>;
  title: string;
  price: number;
  nickname: string;
  genres: Array<string>;
  material: string;
  detail: string;
}

const defaultItem: newItem = {
  imageUrl: [],
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

function AuctionEdit(): JSX.Element {
  const navigate = useNavigate();
  // const userEmail: string | null = userObject.email;

  const [genresList, setGenresList] = useState<string[] | undefined>([]);
  const [newItem, setNewItem] = useState<newItem>(defaultItem);

  // const [imgUrl, setImgUrl] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [showImages, setShowImages] = useState<string[]>([]);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setNewItem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // 이미지를 여러개 가져와 보자!!!!!
  const handleAddImages = (e: any) => {
    const imageLists = e.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const file = imageLists[i];
      setImages((prev) => [...prev, file]);
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: any) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  // const onFileChange = (e: any) => {
  //   const { files } = e.target;
  //   const file = files[0];
  //   setImage(file);

  //   const render = new FileReader();
  //   render.onload = (finishedEvent: any) => {
  //     const { result } = finishedEvent.currentTarget;
  //     setImgUrl(result);
  //   };

  //   render.readAsDataURL(file);
  // };

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

    let imageUrlList: Array<string> = [];

    for (let i = 0; i < images.length; i++) {
      let imageUrl: string = "";
      const imgRef = ref(storageService, `zmmmm111@gmail.com/${uuidv4()}`);
      const response = await uploadBytes(imgRef, images[i]);
      imageUrl = await getDownloadURL(response.ref);
      imageUrlList.push(imageUrl);
    }

    const newAuction = await addDoc(collection(dbService, "auction"), {
      imageUrlList: imageUrlList,
      title: newItem.title,
      price: newItem.price,
      // nickname: userEmail,
      genres: genresList,
      material: newItem.material,
      detail: newItem.detail,
      createdAt: Date.now(),
    });

    setNewItem(defaultItem);
    // setImgUrl("");
    setShowImages([]);
    navigate(`/auction/${newAuction.id}`);
  };

  // const onClearImg = () => {
  //   setShowImages([]);
  //   // setImgUrl("");
  //   setImages([]);
  // };

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Auction Create</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="input-file" onChange={handleAddImages}>
          <input type="file" id="input-file" multiple />
          {/* <Plus fill="#646F7C" /> */}
          <span>사진추가</span>
        </label>
        {showImages && (
          <div>
            {showImages.map((image, id) => (
              <div key={id}>
                <img
                  src={image}
                  alt={`${image}-${id}`}
                  width="30%"
                  height="30%"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.confirm("사진뺄거야?")) {
                      handleDeleteImage(id);
                    }
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        <br />
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
