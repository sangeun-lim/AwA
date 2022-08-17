import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

import { storageService } from "../../fbase";
import { ref, deleteObject } from "firebase/storage";

import { ArtworkItem, User } from "../../Interface";
import { itemDefaultData } from "../../defaultData";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions, chatPartnerActions } from "../../store";
import ReportModal from "./ReportModal";
import CommentForm from "./CommentForm";
import style from "./AuctionCreateUpdate.module.css";
import CommentDetailOrUpdate from "./CommentDetailOrUpdate";
import AuctionUpdate from "./AuctionUpdate";

function AuctionDetailOrUpdate(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const address = params.id || "";

  const [item, setItem] = useState<ArtworkItem>(itemDefaultData);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

  const onListClick = () => {
    navigate("/auction");
  };

  const onEditClick = () => {
    setOnEdit(!onEdit);
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm("삭제하시겠습니까?");
    if (del) {
      dispatch(loadingActions.toggle());

      try {
        const response = await api.artwork.updateOrDelete(
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

  const goChat = () => {
    dispatch(chatPartnerActions.setPartner(item.sell_user_email));
    navigate("/chatting");
  };

  const soldOut = async () => {
    if (window.confirm("판매완료로 변경하시겠습니까?") === true) {
      const response = await api.artwork.sellArtwork(item.artwork_id);
      if (response.data === 1) {
        alert("판매완료로 변경되었습니다.");
        setItem((prev) => {
          return {
            ...prev,
            is_sell: response.data,
          };
        });
      }
    } else {
      return;
    }
  };

  const checkUserLike = async () => {
    if (userObject) {
      const response = await api.like.checkLike(userObject.nickname, address);

      if (response.data === 1) {
        setIsLiked(true);
      }
    }
  };

  const onLikeClick = async (e: any) => {
    e.preventDefault();
    if (userObject) {
      const response = await api.like.checkLike(userObject.nickname, address);
      if (response.data === 0) {
        const likeResponse = await api.like.LikeArticle(
          userObject.nickname,
          address,
          "post"
        );
        if (likeResponse) {
          setIsLiked(true);
          setItem((prev) => {
            return {
              ...prev,
              like_count: prev.like_count + 1,
            };
          });
        }
      } else {
        const unLikeResponse = await api.like.LikeArticle(
          userObject.nickname,
          address,
          "delete"
        );
        if (unLikeResponse) {
          setIsLiked(false);
          setItem((prev) => {
            return {
              ...prev,
              like_count: prev.like_count - 1,
            };
          });
        }
      }
    } else {
      const response = window.confirm(
        "로그인해야 이용가능합니다. 로그인하시겠습니까?"
      );

      if (response) {
        navigate("/auth/login");
      }
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
        dispatch(loadingActions.toggle());
      } else {
        navigate("/auction");
      }
    } catch (err) {
      console.log(err);
      dispatch(loadingActions.toggle());
    }
  }, [address, navigate, dispatch, onEdit]);

  useEffect(() => {
    checkUserLike();
  }, [address, userObject]);

  // detailImage 변경
  const [bigPic, setBigPic] = useState<Element | null>(null);
  const [smallPics, setSmallPics] = useState<NodeListOf<Element> | null>(null);

  useEffect(() => {
    setBigPic(document.querySelector(".big"));
    setSmallPics(document.querySelectorAll(".small"));
  }, [item]);

  useEffect(() => {
    function changePic(this: HTMLElement) {
      const smallPicAttribute = this.getAttribute("src");
      if (smallPicAttribute) {
        bigPic?.setAttribute("src", smallPicAttribute);
      }
    }

    if (smallPics) {
      for (var i = 0; i < smallPics.length; i++) {
        smallPics[i].addEventListener("click", changePic);
      }
    }
  }, [smallPics, bigPic]);

  const firstImg = () => {
    const smallImageList = document.querySelector(".checked > input");
    const checked = smallImageList;
    checked?.setAttribute("checked", "checked");
  };

  return (
    <div>
      {onEdit ? (
        <AuctionUpdate setOnEdit={setOnEdit} />
      ) : (
        <div className={style.auction}>
          <div className={style.detailTop}>
            <div>조회수 : {item.view_count}</div>
            <div>
              <div>
                <button className={style.likeButton} onClick={onLikeClick}>
                  {isLiked ? (
                    <img
                      className={style.likeHeart}
                      src="img/heart.png"
                      alt="like"
                    />
                  ) : (
                    <img
                      className={style.likeHeart}
                      src="img/emptyheart.png"
                      alt="unlike"
                    />
                  )}
                </button>
                <span className={style.detailLike}>{item.like_count}</span>
              </div>
              {userObject && userObject.email !== item.sell_user_email && (
                <button onClick={goChat} className={style.chatBtn}>
                  판매자와 채팅하기
                </button>
              )}
              {userObject && userObject.email === item.sell_user_email && (
                <button
                  disabled={item.is_sell === 1}
                  onClick={soldOut}
                  className={style.chatBtn}
                >
                  판매완료
                </button>
              )}

              {userObject && <ReportModal artworkId={address} />}
            </div>
          </div>

          <div className={style.detail}>
            <div className={style.detailContent}>
              <div className={style.detailImage}>
                <div className={style.smallImageList} onLoad={firstImg}>
                  {item.attachmentRequestDtoList &&
                    item.attachmentRequestDtoList.map(
                      (image: { type: string; url: string }) => (
                        <div key={image.url} className="checked">
                          <input type="radio" id={image.url} name="image" />
                          <label
                            htmlFor={image.url}
                            className={style.smallImage}
                          >
                            <img
                              src={image.url}
                              alt={`${image.url}`}
                              className="small"
                            />
                          </label>
                        </div>
                      )
                    )}
                </div>
                {item.attachmentRequestDtoList && (
                  <div className={style.bigImage}>
                    {item?.attachmentRequestDtoList[0]?.url && (
                      <img
                        src={item.attachmentRequestDtoList[0]?.url}
                        alt=""
                        className="big"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className={style.detailInfo}>
                <div className={style.title}>
                  {item.title}{" "}
                  <div>
                    {item.is_sell === 0 || item.is_sell === 2 ? (
                      <div className={style.sell}>판매중</div>
                    ) : (
                      <div className={style.soldout}>판매완료</div>
                    )}
                  </div>
                </div>
                <div className={style.userNameBox}>
                  <NavLink
                    to={`/profile/${item.sell_user_email}`}
                    className={style.userName}
                  >
                    {item.sell_user_nickname}
                  </NavLink>
                </div>
                <div className={style.detailInfoBox}>
                  <div>가격</div>
                  <p>
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </p>
                </div>
                <div className={style.detailInfoBox}>
                  <div>장르</div>
                  <p>
                    {item.genre.map((item: string, i: number) => (
                      <span key={i}>{item} </span>
                    ))}
                  </p>
                </div>
                <div className={style.detailInfoBox}>
                  <div>재료</div>
                  <p>{item.ingredient}</p>
                </div>
              </div>
              <div className={style.detailBox}>
                <div>상세 정보</div>
                <p>{item.description}</p>
                {userObject && userObject.email === item.sell_user_email && (
                  <div>
                    <button onClick={onEditClick}>수정</button>
                    <button onClick={onDeleteClick}>삭제</button>
                  </div>
                )}
              </div>
            </div>

            <div className={style.detailInfoSide}>
              <div className={style.title}>
                {item.title}
                <div>
                  {item.is_sell === 0 || item.is_sell === 2 ? (
                    <div className={style.sell}>판매중</div>
                  ) : (
                    <div className={style.soldout}>판매완료</div>
                  )}
                </div>
              </div>
              <div className={style.userNameBox}>
                <NavLink
                  to={`/profile/${item.sell_user_email}`}
                  className={style.userName}
                >
                  {item.sell_user_nickname}
                </NavLink>
              </div>
              <div className={style.detailInfoBox}>
                <div>가격</div>
                <p>
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </p>
              </div>
              <div className={style.detailInfoBox}>
                <div>장르</div>
                <p>
                  {item.genre.map((item: string, i: number) => (
                    <span key={i}>{item} </span>
                  ))}
                </p>
              </div>
              <div className={style.detailInfoBox}>
                <div>재료</div>
                <p>{item.ingredient}</p>
              </div>
            </div>
          </div>
          <div className={style.commentBox}>
            {item.comments &&
              item.comments.map((item) => {
                return (
                  <div key={item.comment_id}>
                    <CommentDetailOrUpdate
                      comment={item}
                      setItem={setItem}
                    ></CommentDetailOrUpdate>
                  </div>
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
