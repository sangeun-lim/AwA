import axios from "axios";
import React, { useEffect, useState, ChangeEvent } from "react";
import { User } from "../../Interface";
import { useSelector } from "react-redux";
import style from "./Report.module.css";

interface Props {
  open: boolean;
  close: () => void;
  artworkId: string;
}
interface ReportData {
  content: string;
  report_profile_nickname: string;
  reported_artwork_id: number;
}

const defaultData = {
  content: "",
  report_profile_nickname: "",
  reported_artwork_id: 0,
};

function Report(props: Props): JSX.Element {
  const { open, close, artworkId } = props;
  const [reportForm, setReportForm] = useState<ReportData>(defaultData);
  const categoryList = ["A", "B", "C", "D", "E", "기타"];
  const [category, setCategory] = useState<string>("");

  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setReportForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const selectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  useEffect(() => {}, [category]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const response = await axios({
      url: `http://i7c101.p.ssafy.io:8080/report/${artworkId}`,
      method: "post",
      data: {
        category: category,
        content: reportForm.content,
        report_profile_nickname: userObject.nickname,
        reported_artwork_id: artworkId,
      },
    });

    if (response.status === 200) {
      alert("신고가 접수되었습니다!");
    }
  };

  return (
    <div>
      {open ? (
        <div className={style.report}>
          <form onSubmit={onSubmit} className={style.reportBody}>
            <div className={style.reportCloseBtn}>
              <button onClick={close} className={style.reportBtn}>
                X
              </button>
            </div>
            <div className={style.reportTitle}>
              <h1>게시물 신고</h1>
            </div>
            <div className={style.reportType}>
              <div>신고 유형 : </div>
              <select onChange={selectCategory} value={category}>
                {categoryList.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              {/* <div>
                신고 유형 : <b>{category}</b>
              </div> */}
            </div>
            <div className={style.reportContent}>
              <div>신고내용</div>
              <label htmlFor="content"></label>
              <textarea
                name="content"
                value={reportForm.content}
                cols={30}
                rows={10}
                placeholder="신고 내용을 입력해주세요."
                onChange={onChange}
                required
              ></textarea>
            </div>
            <br />
            <input type="submit" value="신고" className={style.reportBtn} />
            <button onClick={close} className={style.reportBtn}>
              취소
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Report;
