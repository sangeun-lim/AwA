import React from "react";
import CommentForm from "./CommentForm";

const CommentCreate = ({ artworkId }: { artworkId: string }): JSX.Element => {
  return (
    <div>
      <CommentForm artworkId={artworkId}></CommentForm>
    </div>
  );
};

export default CommentCreate;
