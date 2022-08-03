import axios from "axios";
import React, { useEffect, useState, ChangeEvent } from "react";
import { User } from "../../Interface";
import { useSelector } from "react-redux";

interface Props {
  open: boolean;
  close: () => void;
  artworkId: string;
  // setUserObject: Dispatch<React.SetStateAction<User | null>>;
}

interface ReportData {
  // category: string;
  content: string;
  report_profile_nickname: string;
  reported_artwork_id: number;
  // uid: number;
  // itemId: number;
  // artist: string;
  // file: File | any;
}

const defaultData = {
  // category: "",
  content: "",
  report_profile_nickname: "",
  reported_artwork_id: 0,
  // uid: 0,
  // itemId: 0,
  // artist: "",
  // file: [],
};

function Report(props: Props): JSX.Element {
  // const [reportImg, setReportImg] = useState<File>();
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

  // 파일첨부 부분
  // const addFile = (e: any) => {
  //   e.preventDefault();
  //   setReportImg(e.target.file);
  // };

  // 신고하기
  // report_profile_nickname 보내는 부분만 수정하면 일단은 될거같은데..

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(category);
    // console.log(reportForm.content);
    // console.log(userObject.nickname);
    // console.log(artworkId);

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
    <>
      {open ? (
        <form onSubmit={onSubmit}>
          <button onClick={close}>X</button>
          <div>
            <h1>신고</h1>
          </div>
          <hr />
          <div>
            <select onChange={selectCategory} value={category}>
              {categoryList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <p>
              신고 유형: <b>{category}</b>
            </p>
          </div>

          <div>
            <h3>신고내용</h3>
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
          {/* <h3>
            파일첨부
            <label htmlFor="input-file" onChange={addFile}></label>
            <input
              id="input-file"
              type="file"
              accept="image/jpg, image/png, image/jpeg"
            />
          </h3>
          <br /> */}
          <button onClick={close}>취소</button>
          <input type="submit" value="신고하기" />
        </form>
      ) : null}
    </>
  );
}

export default Report;
