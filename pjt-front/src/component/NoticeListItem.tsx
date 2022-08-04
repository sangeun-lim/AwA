import React from "react";
import { NavLink } from "react-router-dom";
import { NoticeItem } from "../Interface";
import style from "../pages/notice/Notice.module.css";

interface Props {
  notice: NoticeItem;
}

const NoticeListItem = ({ notice }: Props): JSX.Element => {
  const date = new Date(notice.createdDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className={style.listBox}>
      <NavLink to={`/notice/${notice.notice_id}`}>{notice.title}</NavLink>
      <div>{`${year}.${month}.${day}`}</div>
    </div>
  );
};

export default NoticeListItem;
