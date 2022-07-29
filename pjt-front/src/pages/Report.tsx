// import axios from "axios";
import React, { useState } from "react";

interface props {
  open: boolean;
  close: () => void;
}

interface ReportData {
  itemId: number;
  uid: number;
  artist: string;
  content: string;
  file: File | any;
}

// itemId: 작품번호, uid: 신고자 id의 번호?, title: 작품제목, artist: 작가는
// 미리 받아와서 디폴트로 줄수있을거같은데 어케해야되니...?
// file 처리는 타입어케해야돼...
const defaultData = {
  itemId: 0,
  uid: 0,
  artist: "",
  content: "",
  file: [],
};

function Report(props: props): JSX.Element {
  const { open, close } = props;
  const [reportForm, setReportForm] = useState<ReportData>(defaultData);
  const [reportImg, setReportImg] = useState<File>();

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setReportForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // 파일첨부 부분
  // 맞는지 모르겠음..
  const addFile = (e: any) => {
    e.preventDefault();
    setReportImg(e.target.file);
  };

  // 신고하기 버튼 눌렀을 때 axios 보내기..?
  const onSubmit = async (e: any) => {
    e.preventDefault();

    // const response = await axios({
    //   url:,
    //   method:,
    //   headers:{

    //   },
    //   data:{
    //     itemId: reportForm.itemId,
    //     uid: reportForm.uid,
    //     title: reportForm.title,
    //     artist: reportForm.artist,
    //     content: reportForm.content,
    //     // file: reportForm.file,
    //   }
    // })
  };

  return (
    <>
      {open ? (
        <form onSubmit={onSubmit}>
          <button onClick={close}>X</button>
          <div>
            <h1>신고</h1>
          </div>
          <br />
          <div>
            <h3>작품ID | {reportForm.itemId}</h3>
          </div>
          <br />
          <div>
            <h3>작가 | {reportForm.artist}</h3>
          </div>
          <br />
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
          <h3>
            파일첨부
            <label htmlFor="input-file" onChange={addFile}></label>
            <input
              id="input-file"
              type="file"
              accept="image/jpg, image/png, image/jpeg"
            />
          </h3>
          <br />
          <button onClick={close}>취소</button>
          <input type="submit" value="신고하기" />
        </form>
      ) : null}
    </>
  );
}

export default Report;
