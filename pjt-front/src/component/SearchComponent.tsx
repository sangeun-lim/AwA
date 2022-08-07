import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/api";
import { QueryType } from "../api/apiInterface";
import { queryDefaultData } from "../defaultData";
import { loadingActions, searchResultsActions } from "../store";
import style from "./SearchComponent.module.css";
import { GrSearch } from "react-icons/gr";

const FAVORITE = ["회화", "조소", "건축", "공예", "서예", "디지털", "기타"];

function SearchComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [query, setQuery] = useState<QueryType>(queryDefaultData);
  const [select, setSelect] = useState<string>("제목");

  const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSelect(value);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setQuery((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const here = !!query.genres.filter((item) => item === value).length;

    if (here) {
      setQuery((prev) => {
        return {
          ...prev,
          genres: prev.genres.filter((item) => item !== value),
        };
      });
    } else {
      setQuery((prev) => {
        return {
          ...prev,
          genres: prev.genres.concat(value),
        };
      });
    }
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery((prev) => {
      return {
        ...prev,
        status: Number(value),
      };
    });
  };

  const onSubmit = async () => {
    if (!query.word) {
      alert("검색어를 입력해주세요");
      return;
    }

    dispatch(loadingActions.toggle());

    try {
      let response;
      if (select === "제목") {
        response = await api.search.searchTitle(query);
      } else {
        response = await api.search.searchWriter(query);
      }
      dispatch(loadingActions.toggle());
      if (response.status === 200) {
        dispatch(searchResultsActions.setResults(response.data));
      }

      navigate(`/searchresult/${query.word}`);
    } catch (err) {
      console.error(err);
      dispatch(loadingActions.toggle());
    }
  };

  return (
    <div className={style.search}>
      <div className={style.searchBar}>
        <select name="kind" onChange={selectChange}>
          <option value="제목">제목</option>
          <option value="작가">작가</option>
        </select>
        <div className={style.searchInput}>
          <input
            name="word"
            type="text"
            placeholder="검색어를 입력해주세요."
            onChange={onChange}
            required
          />
          <GrSearch onClick={onSubmit} className={style.searchIcon} />
        </div>
      </div>
      <div className={style.searchOption}>
        <span>작품종류</span>
        <div className={style.options}>
          {FAVORITE.map((item) => {
            return (
              <div key={item}>
                <input
                  type="checkbox"
                  value={item}
                  id={item}
                  onChange={onGenreChange}
                  checked={
                    !!query.genres.filter((genre) => genre === item).length
                  }
                />
                <label htmlFor={item}>{item}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.searchOption}>
        <span>가격범위</span>
        <div>
          <input
            name="min_price"
            type="number"
            step={1000}
            value={query.min_price}
            onChange={onChange}
          />{" "}
          ~{" "}
          <input
            name="max_price"
            type="number"
            step={1000}
            value={query.max_price}
            onChange={onChange}
          />
        </div>
      </div>
      <div className={style.searchOption}>
        <span>판매상태</span>
        <div className={style.options}>
          <div>
            <input
              type="checkbox"
              value={0}
              onChange={onStatusChange}
              checked={query.status === 0}
              id="전체"
            />
            <label htmlFor="전체">전체</label>
          </div>
          <div>
            <input
              type="checkbox"
              value={1}
              onChange={onStatusChange}
              checked={query.status === 1}
              id="판매중"
            />
            <label htmlFor="판매중">판매중</label>
          </div>
          <div>
            <input
              type="checkbox"
              value={2}
              onChange={onStatusChange}
              checked={query.status === 2}
              id="판매완료"
            />
            <label htmlFor="판매완료">판매완료</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
