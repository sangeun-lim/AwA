import React, { useEffect, useState, ChangeEvent } from "react";
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
import ReportModal from "./ReportModal";
import CommentForm from "./CommentForm";
import CommentDetailOrUpdate from "./CommentDetailOrUpdate";
import axios from "axios";
import style from "./AuctionCreateUpdate.module.css";

interface ButtonProps {
  item: string;
  deleteGenre(item: string): void;
}

// Button Component
function GenreButton({ item, deleteGenre }: ButtonProps): JSX.Element {
  useEffect(() => {}, []);

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

function AuctionDetailOrUpdate(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const address = params.id || "";

  const [item, setItem] = useState<ArtworkItem>(itemDefaultData);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  // 라이크는 좋아요 개수를 다른 변수에 저장해놓고, 눌렀을때 변화가 되게?
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

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

  const onListClick = () => {
    navigate("/auction");
  };

  const onEditClick = () => {
    setOnEdit(!onEdit);
  };

  const onCancelClick = () => {
    navigate(`/auction/detail/${item.artwork_id}`);
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

        const response = await api.artwork.readOrUpdateOrDelete(
          address,
          data,
          "put"
        );

        if (response.status === 200) {
          const updateData = response.data;
          const {
            artwork_id,
            attachmentRequestDtoList,
            comments,
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
            comments,
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
          });
        }
      }

      setOnEdit(!onEdit);
      dispatch(loadingActions.toggle());
    } catch (err) {
      console.log(err);
      dispatch(loadingActions.toggle());
    }
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm("삭제하시겠습니까?");
    if (del) {
      dispatch(loadingActions.toggle());

      try {
        const response = await api.artwork.readOrUpdateOrDelete(
          address,
          null,
          "delete"
        );

        dispatch(loadingActions.toggle());
        if (response.status === 200) {
          for (let i = 0; i < item.attachmentRequestDtoList.length; i++) {
            const imgRef = ref(
              storageService,
              item.attachmentRequestDtoList[i].url
            );
            await deleteObject(imgRef);
          }
          navigate("/auction");
        } else {
          alert("실패했습니다.");
        }
      } catch (err) {
        dispatch(loadingActions.toggle());
        console.error(err);
      }
    }
  };

  const onLikeClick = async (e: any) => {
    e.preventDefault();
    // 좋아요 눌렀는지 안 눌렀는지 확인
    const response = await axios({
      // url: `http://i7c101.p.ssafy.io:8080/like/have/${userObject?.nickname}/${address}`,
      url: `http://i7c101.p.ssafy.io:8081/api/like/have/${userObject?.nickname}/${address}`,
      method: "get",
    });

    // 좋아요를 누를 때
    if (response.data === 0) {
      const likeResponse = await axios({
        // url: `http://i7c101.p.ssafy.io:8080/like/${userObject?.nickname}/${address}`,
        url: `http://i7c101.p.ssafy.io:8081/api/like/${userObject?.nickname}/${address}`,
        method: "post",
        data: {
          artwork_id: address,
          nickname: userObject?.nickname,
        },
      });

      if (likeResponse) {
        setItem((prev) => {
          return {
            ...prev,
            like_count: prev.like_count + 1,
          };
        });
      }
    }
    // 좋아요를 취소할 때
    else {
      const unLikeResponse = await axios({
        // url: `http://i7c101.p.ssafy.io:8080/like/${userObject?.nickname}/${address}`,
        url: `http://i7c101.p.ssafy.io:8081/api/like/${userObject?.nickname}/${address}`,
        method: "delete",
        data: {
          artwork_id: address,
          nickname: userObject?.nickname,
        },
      });
      if (unLikeResponse) {
        setItem((prev) => {
          return {
            ...prev,
            like_count: prev.like_count - 1,
          };
        });
      }
    }
  };

  useEffect(() => {
    async function loadData() {
      const response = await api.artwork.readOrUpdateOrDelete(
        address,
        null,
        "get"
      );

      if (response.status === 200) {
        const auctionItem = response.data;

        const {
          artwork_id,
          attachmentRequestDtoList,
          comments,
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
          comments,
          attachmentRequestDtoList,
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
        dispatch(loadingActions.toggle());
        loadData();
        dispatch(loadingActions.toggle());
      } else {
        navigate("/notice");
      }
    } catch (err) {
      console.log(err);
      dispatch(loadingActions.toggle());
    }
  }, [address, navigate, dispatch]);

  useEffect(() => {
    setEditItem({
      title: item.title,
      price: item.price,
      ingredient: item.ingredient,
      description: item.description,
    });

    setGenresList(item.genre);
    setShowImages(
      item.attachmentRequestDtoList.map(
        (media: { url: string; type: string }) => {
          return media.url;
        }
      )
    );

    // setLike(item.like_count);
  }, [onEdit, item]);

  return (
    <div>
      {onEdit ? (
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
              <input
                type="submit"
                value="수정"
                className={style.submitButton}
              />
              <button onClick={onCancelClick} className={style.btn}>
                취소
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={style.auction}>
          <div className={style.detailTop}>
            <p>조회수 : {item.view_count}</p>
            <div>
              {userObject?.nickname ? (
                <p className={style.detailLike}>
                  <button onClick={onLikeClick}>❤</button>
                  {item.like_count}
                </p>
              ) : (
                <p className={style.detailLike}>{item.like_count} </p>
              )}
              <ReportModal artworkId={address} />
            </div>
          </div>
          <div className={style.detail}>
            <div className={style.detailImage}>
              {item.attachmentRequestDtoList.length &&
                item.attachmentRequestDtoList.map(
                  (image: { type: string; url: string }) => (
                    <div key={image.url} className={style.imageSample}>
                      <img src={image.url} alt={`${image.url}`} />
                    </div>
                  )
                )}
            </div>
            <div className={style.detailInfo}>
              <div className={style.title}>{item.title}</div>
              <div className={style.userName}>{item.sell_user_nickname}</div>
              <hr />
              <div className={style.detailInfoBox}>
                <div>가격</div>
                <p>{item.price}원</p>
              </div>
              <hr />
              <div className={style.detailInfoBox}>
                <div>장르</div>
                <p>
                  {item.genre.map((item: string, i: number) => (
                    <span key={i}>{item} </span>
                  ))}
                </p>
              </div>
              <hr />
              <div className={style.detailInfoBox}>
                <div>재료</div>
                <p>{item.ingredient}</p>
              </div>
            </div>
          </div>
          <div className={style.detailBox}>
            <div>상세 정보</div>
            <p>{item.description}</p>
            <div>
              <button onClick={onEditClick}>수정</button>
              <button onClick={onDeleteClick}>삭제</button>
            </div>
          </div>
          <div className={style.detailBox}>
            {item.comments &&
              item.comments.map((item) => {
                return (
                  <li key={item.comment_id}>
                    {item.content} | 작성자 : {item.nickname}
                    <CommentDetailOrUpdate
                      comment={item}
                      setItem={setItem}
                    ></CommentDetailOrUpdate>
                  </li>
                );
              })}
            <CommentForm
              setItem={setItem}
              artworkId={Number(address)}
            ></CommentForm>
          </div>
          <div className={style.detailBottom}>
            <button onClick={onListClick}>목록</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuctionDetailOrUpdate;
