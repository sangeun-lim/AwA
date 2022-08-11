import { DividerClassKey } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { Follow } from "../../Interface";
import style from "./Follow.module.css";

interface Props {
  open: boolean;
  close: () => void;
  checked: boolean[];
  follower_list: Follow[];
  following_list: Follow[];
}

function Followers(props: Props): JSX.Element {
  const { open, close, checked, follower_list, following_list } = props;

  return (
    <div>
      {open ? (
        <div className={style.followModal}>
          <div className={style.followModalBody}>
            <div className={style.followCloseBtn}>
              <button onClick={close} className={style.followBtn}>
                X
              </button>
            </div>
            <input
              type="radio"
              name="followTabmenu"
              id="follwers"
              defaultChecked={checked[0]}
            />
            <input
              type="radio"
              name="followTabmenu"
              id="followings"
              defaultChecked={checked[1]}
            />
            <div className={style.followTabmenu}>
              <label htmlFor="follwers" className={style.follwers}>
                <div>팔로워</div>
              </label>
              <label htmlFor="followings" className={style.followings}>
                <div>팔로잉</div>
              </label>
            </div>
            <div className={style.followtabInner}>
              <div className={style.followTabs}>
                <div className={style.followTab}>
                  {follower_list.map((item) => {
                    return (
                      <div key={item.nickname} className={style.followList}>
                        <div className={style.followListImg}>
                          {item.profile_picture_url ? (
                            <img
                              src={item.profile_picture_url}
                              alt="프로필사진"
                            />
                          ) : (
                            <img
                              src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
                              alt="프로필사진"
                            />
                          )}
                        </div>
                        <div className={style.followListName}>
                          <NavLink
                            onClick={close}
                            to={`/profile/${item.userEmail}`}
                            className={style.moveEmail}
                          >
                            {item.nickname}
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={style.followTab}>
                  {following_list.map((item) => {
                    return (
                      <div key={item.nickname} className={style.followList}>
                        <div className={style.followListImg}>
                          {item.profile_picture_url ? (
                            <img
                              src={item.profile_picture_url}
                              alt="프로필사진"
                            />
                          ) : (
                            <img
                              src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
                              alt="프로필사진"
                            />
                          )}
                        </div>
                        <div className={style.followListName}>
                          <NavLink
                            onClick={close}
                            to={`/profile/${item.userEmail}`}
                            className={style.moveEmail}
                          >
                            {item.nickname}
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Followers;
