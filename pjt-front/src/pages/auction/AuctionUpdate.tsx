import React, { useEffect, useState, ChangeEvent, Dispatch } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { storageService } from "../../fbase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { ArtworkItem, User, editItem } from "../../Interface";
import { itemDefaultData } from "../../defaultData";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store";
import style from "./AuctionCreateUpdate.module.css";

interface Props {
  setOnEdit: Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonProps {
  item: string;
  deleteGenre(item: string): void;
}

// Button Component
function GenreButton({ item, deleteGenre }: ButtonProps): JSX.Element {
  return (
    <div className={style.selected}>
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

function AuctionUpdate({ setOnEdit }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const address = params.id || "";

  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

  const [item, setItem] = useState<ArtworkItem>(itemDefaultData);

  // 수정용 상태 선언
  const [genresList, setGenresList] = useState<string[]>([]);
  const [editItem, setEditItem] = useState<editItem>({
    title: "",
    price: 0,
    ingredient: "",
    description: "",
    is_sell: 0,
  });

  // 수정용 이미지
  const [images, setImages] = useState<File[]>([]);
  // 수정할 때 보여주는 이미지 url
  const [showImages, setShowImages] = useState<string[]>([]);
  // 삭제할 이미지 url
  const [delImages, setDelImages] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>();

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

  const onCancelClick = () => {
    setOnEdit(false);
  };

  const loadName = (e: any) => {
    const file = e.target.files[0].name;
    setFileName(file);
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(loadingActions.toggle());

    try {
      if (userObject) {
        // 기존 이미지 url들을 imageUrlLists에 담는다.
        let imageUrlLists: string[] = item.attachmentRequestDtoList.map(
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

        const data = {
          sell_user_nickname: item.sell_user_nickname,
          ...editItem,
          genre: genresList,
          attachmentList: imageUrlLists.map((item) => {
            return { type: "image", url: item };
          }),
        };

        const response = await api.artwork.updateOrDelete(address, data, "put");

        setItem((prev) => {
          return {
            ...response.data,
            comments: prev.comments,
            sell_user_email: prev.sell_user_email,
          };
        });
      }

      dispatch(loadingActions.toggle());
      setOnEdit(false);
    } catch (err) {
      console.log(err);
      dispatch(loadingActions.toggle());
    }
  };

  useEffect(() => {
    async function loadData() {
      const response = await api.artwork.read(address);
      setItem(response.data);
    }

    try {
      if (address) {
        dispatch(loadingActions.toggle());
        loadData();
        setEditItem({
          /* eslint-disable */
          title: item.title,
          price: item.price,
          ingredient: item.ingredient,
          description: item.description,
          is_sell: item.is_sell,
        });

        setGenresList(item.genre);
        setShowImages(
          item.attachmentRequestDtoList.map(
            (media: { url: string; type: string }) => {
              return media.url;
            }
          )
        );
        dispatch(loadingActions.toggle());
      } else {
        navigate("/auction");
      }
    } catch (err) {
      console.log(err);
      dispatch(loadingActions.toggle());
    }
  }, [address, navigate, dispatch, item.artwork_id]);

  return (
    <div className={style.auction}>
      <section className={style.auctionTop}>
        <div>
          <div className={style.title}>Auction</div>
          <div className={style.content}>판매중인 상품을 수정해주세요!</div>
        </div>
      </section>
      <form onSubmit={onSubmit}>
        <div className={style.formBox}>
          <div className={style.image}>
            <label
              htmlFor="input-file"
              onChange={handleAddImages}
              className={style.imageInput}
            >
              <input
                type="file"
                accept="image/*"
                id="input-file"
                onChange={loadName}
                multiple
              />
              <input
                className={style.imageUpload}
                placeholder={fileName}
                readOnly
              />
              <span>사진추가</span>
            </label>
            {showImages && (
              <div className={style.showImages}>
                {showImages.map((image, id) => (
                  <div key={id} className={style.imageSample}>
                    <img src={image} alt={`${image}-${id}`} />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.confirm("사진을 삭제하시겠습니까?")) {
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
          </div>
          <div className={style.info}>
            <div className={style.inputContainer}>
              <input
                name="title"
                type="text"
                placeholder="title"
                value={editItem.title || ""}
                onChange={onChange}
                className={style.input}
                required
              />
              <label htmlFor="title">작품명</label>
              <div className={style.bar}></div>
            </div>
            <div className={style.inputContainer}>
              <input
                name="price"
                type="number"
                placeholder="price"
                min="0"
                max="2147483000"
                step="1000"
                value={editItem.price}
                onChange={onChange}
                className={style.input}
                required
              />
              <label htmlFor="price">가격</label>
              <div className={style.bar}></div>
            </div>
            <div>
              <div className={style.selectLabel}>장르선택</div>
              <select
                name="genres"
                id="genres"
                onChange={selectGenres}
                defaultValue=""
                className={style.selectBox}
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
            </div>
            <div className={style.selectList}>
              {genresList &&
                genresList.map((item, i) => (
                  <div key={i}>
                    <GenreButton
                      deleteGenre={deleteGenre}
                      item={item}
                    ></GenreButton>
                  </div>
                ))}
            </div>
            <div className={style.inputContainer}>
              <input
                name="ingredient"
                type="text"
                placeholder="재료"
                value={editItem.ingredient || ""}
                onChange={onChange}
                className={style.input}
                required
              />
              <label htmlFor="ingredient">재료</label>
              <div className={style.bar}></div>
            </div>
            <div className={style.inputContainer}>
              <div className={style.selectLabel}>상세 설명</div>
              <textarea
                name="description"
                cols={30}
                rows={10}
                placeholder="상세 설명"
                value={editItem.description || ""}
                onChange={onChange}
                className={style.inputTextarea}
              ></textarea>
            </div>
          </div>
        </div>
        <div className={style.formButtonBox}>
          <input type="submit" value="수정" className={style.submitButton} />
          <button onClick={onCancelClick} className={style.btn}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuctionUpdate;
