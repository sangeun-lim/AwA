import React, { useState } from "react";
import Report from "./Report";

const ReportModal = (): JSX.Element => {
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
      <Report open={showReport} close={closeReport}></Report>
    </div>
  );
};

export default ReportModal;
