import React, { useState, useEffect, ChangeEvent, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Interface";

import { storageService } from "../../fbase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import api from "../../api/api";

interface Props {
  userObject: User;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonProps {
  item: string;
  deleteGenre(item: string): void;
}

interface newItem {
  description: string;
  genre: string[];
  ingredient: string;
  price: number;
  sell_user_nickname: string;
  title: string;
}

const defaultItem: newItem = {
  title: "",
  price: 0,
  sell_user_nickname: "",
  genre: [],
  ingredient: "",
  description: "",
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

function AuctionCreate({ userObject, setIsLoading }: Props): JSX.Element {
  const navigate = useNavigate();

  const [genresList, setGenresList] = useState<string[] | undefined>([]);
  const [newItem, setNewItem] = useState<newItem>(defaultItem);

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
    setImages(images.filter((_, index) => index !== id));
    setShowImages(showImages.filter((_, index) => index !== id));
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
      const newGenreList = prev?.filter((gen) => gen !== item);
      return newGenreList;
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      let imageUrlList: Array<string> = [];

      for (let i = 0; i < images.length; i++) {
        let imageUrl: string = "";
        const imgRef = ref(storageService, `${userObject.email}/${uuidv4()}`);
        const response = await uploadBytes(imgRef, images[i]);
        imageUrl = await getDownloadURL(response.ref);
        imageUrlList.push(imageUrl);
      }

      const response = await axios({
        url: api.artwork.readAllOrPost(),
        method: "post",
        headers: { token: localStorage.getItem("token") || "" },
        data: {
          ...newItem,
          genre: genresList,
          attachmentList: imageUrlList.map((item) => {
            return { type: "image", url: item };
          }),
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const next_url = data.artwork_id;
        setNewItem(defaultItem);
        setShowImages([]);
        setIsLoading(false);
        alert("작성 완료");
        navigate(`/auction/detail/${next_url}`);
      } else {
        setIsLoading(false);
        alert("작성 실패");
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    setNewItem((prev) => {
      return {
        ...prev,
        sell_user_nickname: userObject.nickname,
      };
    });
  }, [userObject.nickname]);

  return (
    <div>
      <h1>Auction Create</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="input-file" onChange={handleAddImages}>
          <input type="file" accept="image/*" id="input-file" multiple />
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
        <select name="genre" id="genre" onChange={selectGenres} defaultValue="">
          <option value="" disabled>
            선택
          </option>
          <option value="회화">회화</option>
          <option value="조소">조소</option>
          <option value="건축">건축</option>
          <option value="공예">공예</option>
          <option value="서예">서예</option>
          <option value="디지털">디지털</option>
          <option value="기타">기타</option>
        </select>
        <br />
        <input
          name="ingredient"
          type="text"
          placeholder="재료"
          value={newItem.ingredient || ""}
          onChange={onChange}
          required
        />
        <br />
        <textarea
          name="description"
          cols={30}
          rows={10}
          placeholder="상세 설명"
          value={newItem.description || ""}
          onChange={onChange}
        ></textarea>
        <br />
        <input type="submit" value="작성" />
      </form>
    </div>
  );
}

export default AuctionCreate;
