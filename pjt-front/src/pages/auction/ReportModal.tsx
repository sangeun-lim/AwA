import React, { useState } from "react";
import Report from "./Report";
import { User, ArtworkItem } from "../../Interface";
import style from "./Report.module.css";

const ReportModal = ({ artworkId }: { artworkId: string }): JSX.Element => {
  const [showReport, setShowReport] = useState<boolean>(false);

  function openReport() {
    setShowReport(!showReport);
  }

  function closeReport() {
    setShowReport(!showReport);
  }

  return (
    <div>
      <button onClick={openReport} className={style.reportBtnRed}>
        신고
      </button>
      <Report
        open={showReport}
        close={closeReport}
        artworkId={artworkId}
      ></Report>
    </div>
  );
};

export default ReportModal;
