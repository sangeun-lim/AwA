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
  imageUrlList: [],
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
  // const [imgUrl, setImgUrl] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [showImages, setShowImages] = useState<string[]>([]);
  const [delImages, setDelImages] = useState<string[]>([]);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setEditItem((prev) => {
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
    setDelImages((prev) => {
      const delImage = showImages[id];
      return [...prev, delImage];
    });
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

  const onListClick = () => {
    navigate("/auction");
  };

  const onEditClick = () => {
    setOnEdit(!onEdit);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrlLists: Array<string> = item.imageUrlList;

    for (let i = 0; i < images.length; i++) {
      let imageUrl: string = "";
      const imgRef = ref(storageService, `zmmmm111@gmail.com/${uuidv4()}`);
      const response = await uploadBytes(imgRef, images[i]);
      imageUrl = await getDownloadURL(response.ref);
      imageUrlLists.push(imageUrl);
    }

    for (let i = 0; i < delImages.length; i++) {
      const imgRef = ref(storageService, delImages[i]);
      await deleteObject(imgRef);
      imageUrlLists = imageUrlLists.filter((item) => item !== delImages[i]);
    }

    await updateDoc(doc(dbService, `auction/${address}`), {
      imageUrlList: imageUrlLists,
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

  // const onClearImg = () => {
  //   // setImgUrl("");
  //   setImage(null);
  // };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm("삭제하시겠습니까?");
    if (del) {
      await deleteDoc(doc(dbService, `auction/${address}`));
      for (let i = 0; i < item.imageUrlList.length; i++) {
        const imgRef = ref(storageService, item.imageUrlList[i]);
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
    setShowImages(item.imageUrlList);
  }, [onEdit, item]);

  return (
    <div>
      {onEdit ? (
        <div>
          <h1>Auction Edit</h1>
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
                      width="20%"
                      height="20%"
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
          {item.imageUrlList && (
            <div>
              {item.imageUrlList.map((image: any, id: any) => (
                <div key={id}>
                  <img
                    src={image}
                    alt={`${image}-${id}`}
                    width="30%"
                    height="30%"
                  />
                </div>
              ))}
            </div>
          )}
          <h2>{item.title}</h2>
          <p>작성자 : {item.nickname}</p>
          <p>가격 : {item.price}원</p>
          {/* <p>
            장르 :{" "}
            {item.genres.map((item: string, i: number) => (
              <span key={i}>{item} </span>
            ))}
          </p> */}
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
