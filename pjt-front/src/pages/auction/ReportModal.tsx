import React, { useState } from "react";
import Report from "./Report";
import { User } from "../../Interface";

const ReportModal = (artworkId: any, user: User): JSX.Element => {
  const [showReport, setShowReport] = useState<boolean>(false);

  function openReport() {
    setShowReport(!showReport);
  }

  function closeReport() {
    setShowReport(!showReport);
  }

  return (
    <div>
      <button onClick={openReport}>신고</button>
      <Report
        open={showReport}
        close={closeReport}
        artworkId={artworkId}
        nickname={user.nickname}
      ></Report>
    </div>
  );
};

export default ReportModal;
