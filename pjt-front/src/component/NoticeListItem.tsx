import React from "react";
import { NavLink } from "react-router-dom";
import { NoticeItem } from "../Interface";

interface Props {
  notice: NoticeItem;
}

const NoticeListItem = ({ notice }: Props): JSX.Element => {
  const date = new Date(notice.createdDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div>
      <NavLink to={`/notice/${notice.notice_id}`}>{notice.title}</NavLink>
      <span>{`${year}.${month}.${day}`}</span>
    </div>
  );
};

export default NoticeListItem;
