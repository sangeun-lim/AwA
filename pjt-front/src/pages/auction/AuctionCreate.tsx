import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { storageService } from "../../fbase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../Interface";
import { NewItemData } from "../../api/apiInterface";
import { newItemDefaultData } from "../../defaultData";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store";

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

function AuctionCreate(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [genresList, setGenresList] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<NewItemData>(newItemDefaultData);

  const [images, setImages] = useState<File[]>([]);
  const [showImages, setShowImages] = useState<string[]>([]);
  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );

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

    dispatch(loadingActions.toggle());
    try {
      let imageUrlList: Array<string> = [];

      for (let i = 0; i < images.length; i++) {
        let imageUrl: string = "";
        const imgRef = ref(storageService, `${userObject.email}/${uuidv4()}`);
        const response = await uploadBytes(imgRef, images[i]);
        imageUrl = await getDownloadURL(response.ref);
        imageUrlList.push(imageUrl);
      }

      const response = await api.artwork.post(
        newItem,
        genresList,
        imageUrlList
      );

      dispatch(loadingActions.toggle());
      if (response.status === 200) {
        if (response.headers["x-auth-token"]) {
          localStorage.setItem("token", response.headers["x-auth-token"]);
          localStorage.setItem(
            "refresh_token",
            response.headers["refreshtoken"] || ""
          );
        }

        const data = response.data;
        const next_url = data.artwork_id;

        alert("작성 완료");
        navigate(`/auction/detail/${next_url}`);
      } else {
        alert("작성 실패");
      }
    } catch (err) {
      dispatch(loadingActions.toggle());
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
