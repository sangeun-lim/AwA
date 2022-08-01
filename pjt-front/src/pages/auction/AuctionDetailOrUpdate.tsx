import React, { useEffect, useState, ChangeEvent, Dispatch } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArtworkItem, User } from "../../Interface";

import { storageService } from "../../fbase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import api from "../../api/api";

interface editItem {
  title: string;
  price: number;
  ingredient: string;
  description: string;
}

const defaultItem: ArtworkItem = {
  artwork_id: 0,
  mediaList: [],
  genre: [],
  ingredient: "",
  like_count: 0,
  price: 0,
  sell_user_email: "",
  sell_user_nickname: "",
  title: "",
  profile_picture: "",
  view_count: 0,
  description: "",
  createdDate: "",
};

interface Props {
  userObject: User | null;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

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

function AuctionDetailOrUpdate({
  userObject,
  setIsLoading,
}: Props): JSX.Element {
  const navigate = useNavigate();

  const params = useParams();
  const address = params.id;

  const [item, setItem] = useState<ArtworkItem>(defaultItem);
  const [onEdit, setOnEdit] = useState<boolean>(false);

  // 수정용 상태 선언
  const [genresList, setGenresList] = useState<string[]>([]);
  const [editItem, setEditItem] = useState<editItem>({
    title: item.title,
    price: item.price,
    ingredient: item.ingredient,
    description: item.description,
  });

  // 수정용 이미지
  const [images, setImages] = useState<File[]>([]);
  // 수정할 때 보여주는 이미지 url
  const [showImages, setShowImages] = useState<string[]>([]);
  // 삭제할 이미지 url
  const [delImages, setDelImages] = useState<string[]>([]);

  // 수정 상태 변화
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

    for (let i = 0; i < imageLists.length; i++) {
      const file = imageLists[i];
      setImages((prev) => [...prev, file]);
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      setShowImages((prev: string[]) => {
        return [...prev, currentImageUrl];
      });
    }

    setShowImages((prev) => {
      return [...prev.slice(0, 10)];
    });
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setImages(images.filter((_, index) => index !== id));
    setShowImages(showImages.filter((_, index) => index !== id));
    setDelImages((prev) => {
      const delImage = showImages[id];
      return [...prev, delImage];
    });
  };

  const selectGenres = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setGenresList((prev) => {
      if (!prev.includes(value)) {
        return [...prev, value];
      } else {
        return [...prev];
      }
    });
  };

  const deleteGenre = (item: string) => {
    setGenresList((prev) => {
      const newGenreList = prev.filter((genre) => genre !== item);
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
    setIsLoading(true);

    try {
      if (userObject) {
        // 기존 이미지 url들을 imageUrlLists에 담는다.
        let imageUrlLists: string[] = item.mediaList.map(
          (media: { type: string; url: string }) => {
            return media.url;
          }
        );

        // 새로 추가된 이미지들을 클라우드 스토리지에 저장후 url을 받아서 리스트에 추가하자
        for (let i = 0; i < images.length; i++) {
          let imageUrl: string = "";
          const imgRef = ref(storageService, `${userObject.email}/${uuidv4()}`);
          const response = await uploadBytes(imgRef, images[i]);
          imageUrl = await getDownloadURL(response.ref);
          imageUrlLists.push(imageUrl);
        }

        // 삭제한 이미지들을 클라우드 스토리지에서 삭제하고 imageUrlLists에서 빼자
        for (let i = 0; i < delImages.length; i++) {
          const imgRef = ref(storageService, delImages[i]);
          await deleteObject(imgRef);
          imageUrlLists = imageUrlLists.filter((item) => item !== delImages[i]);
        }

        const response = await axios({
          url: api.artwork.readDetailOrUpdateOrDelete(address || ""),
          method: "put",
          headers: { token: localStorage.getItem("token") || "" },
          data: {
            sell_user_nickname: item.sell_user_nickname,
            ...editItem,
            genre: genresList,
            attachmentList: imageUrlLists.map((item) => {
              return { type: "image", url: item };
            }),
          },
        });

        if (response.status === 200) {
          const updateData = response.data;
          const {
            artwork_id,
            attachmentRequestDtoList,
            createdDate,
            description,
            genre,
            ingredient,
            like_count,
            price,
            profile_picture,
            sell_user_email,
            sell_user_nickname,
            title,
            view_count,
          } = updateData;

          setItem({
            artwork_id,
            mediaList: attachmentRequestDtoList,
            createdDate,
            description,
            genre,
            ingredient,
            like_count,
            price,
            profile_picture,
            sell_user_email,
            sell_user_nickname,
            title,
            view_count,
          });
        }
      }

      setOnEdit(!onEdit);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm("삭제하시겠습니까?");
    if (del) {
      const response = await axios({
        url: api.artwork.readDetailOrUpdateOrDelete(address || ""),
        method: "delete",
        headers: { token: localStorage.getItem("token") || "" },
      });
      if (response.status === 200) {
        for (let i = 0; i < item.mediaList.length; i++) {
          const imgRef = ref(storageService, item.mediaList[i].url);
          await deleteObject(imgRef);
        }
        navigate("/auction");
      } else {
        alert("실패했습니다.");
      }
    }
  };

  useEffect(() => {
    async function loadData() {
      const response = await axios({
        url: api.artwork.readDetailOrUpdateOrDelete(address || ""),
        method: "get",
      });

      if (response.status === 200) {
        const auctionItem = response.data;

        const {
          artwork_id,
          attachmentRequestDtoList,
          createdDate,
          description,
          genre,
          ingredient,
          like_count,
          price,
          profile_picture,
          sell_user_nickname,
          sell_user_email,
          title,
          view_count,
        } = auctionItem;

        setItem({
          artwork_id,
          mediaList: attachmentRequestDtoList,
          genre,
          createdDate,
          description,
          price,
          title,
          ingredient,
          like_count,
          profile_picture,
          sell_user_nickname,
          sell_user_email,
          view_count,
        });
      }
    }

    try {
      if (address) {
        setIsLoading(true);
        loadData();
        setIsLoading(false);
      } else {
        navigate("/notice");
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [address, navigate, setIsLoading]);

  useEffect(() => {
    setEditItem({
      title: item.title,
      price: item.price,
      ingredient: item.ingredient,
      description: item.description,
    });

    setGenresList(item.genre);
    setShowImages(
      item.mediaList.map((media: { url: string; type: string }) => {
        return media.url;
      })
    );
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
              value={editItem.ingredient || ""}
              onChange={onChange}
              required
            />
            <br />
            <textarea
              name="description"
              cols={30}
              rows={10}
              placeholder="상세 설명"
              value={editItem.description || ""}
              onChange={onChange}
            ></textarea>
            <br />
            <input type="submit" value="작성" />
          </form>
        </div>
      ) : (
        <div>
          <h1>AuctionDetail</h1>
          {item.mediaList.length &&
            item.mediaList.map((image: { type: string; url: string }) => (
              <div key={image.url}>
                <img
                  src={image.url}
                  alt={`${image.url}`}
                  width="30%"
                  height="30%"
                />
              </div>
            ))}
          <h2>{item.title}</h2>
          <p>작성자 : {item.sell_user_nickname}</p>
          <p>가격 : {item.price}원</p>
          <p>
            장르 :{" "}
            {item.genre.map((item: string, i: number) => (
              <span key={i}>{item} </span>
            ))}
          </p>
          <p>재료 : {item.ingredient}</p>
          <p>{item.description}</p>
          <button onClick={onEditClick}>수정</button>
          <button onClick={onDeleteClick}>삭제</button>
          <button onClick={onListClick}>목록</button>
        </div>
      )}
    </div>
  );
}

export default AuctionDetailOrUpdate;
