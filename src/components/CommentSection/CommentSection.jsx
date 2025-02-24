import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, fetchComments } from "../../redux/slides/commentSlice";
import Avatar from "../../assets/image_default.png";
import { FaThumbsUp } from "react-icons/fa";
import { toggleLike } from "../../redux/slides/likeSlice";

const CommentSection = ({ idBook }) => {
  const [comment, setComment] = useState("");
  const listComment = useSelector((state) => state.comment.listComment);
  const [commentId, setCommentId] = useState();
  const [commentIdReply, setCommentIdReply] = useState();
  const [replay, setReplay] = useState(false);
  const limit = 5;
  const pageCurrent = 1;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComments({ idBook, limit, pageCurrent }));
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e, parentId) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(
        createComment({ content: comment, bookId: idBook, parentId })
      ).then(() => {
        dispatch(fetchComments({ idBook, limit, pageCurrent }));
        setComment("");
        setReplay(false);
      });
    }
  };

  const handleCommentId = (commentId) => {
    setCommentId(commentId);
    setReplay(!replay);
    setCommentIdReply(commentId);
  };

  const handleLike = (commentId) => {
    dispatch(toggleLike({ commentId })).then(() => {
      dispatch(fetchComments({ idBook, limit, pageCurrent }));
    });
  };

  return (
    <div className="p-4 rounded-lg bg-white mt-8">
      <h2 className="text-lg font-semibold mb-2">Bình luận</h2>
      <form
        onSubmit={(e) => handleSubmit(e, null)}
        className="flex flex-col space-y-3"
      >
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Nhập bình luận của bạn..."
          className="border p-2 rounded-md w-full h-20 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-800 w-[150px] text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Gửi bình luận
        </button>
      </form>

      <div className="mt-4">
        {listComment?.map((cmt, index) => (
          <div key={index} className="p-2  flex gap-3 ">
            {/* {console.log("cmt", cmt)}
            {cmt.reply &&
              cmt.reply.map((comment) => {
                return (
                  <>
                    <div className="flex">
                      <div>{comment.user.avatar || Avatar}</div>
                      <div>{comment.content}</div>
                    </div>
                  </>
                );
              })} */}
            <div>
              <img src={cmt.user.avatar || Avatar} className="w-9 h-9" />
            </div>
            <div className=" flex flex-col flex-1">
              <div className="flex gap-3">
                <p className="font-semibold">{cmt.user.name}</p>
                <p>{cmt.content}</p>
              </div>
              <div className="flex gap-5 mt-2 text-[14px]">
                <p
                  className="flex gap-2 cursor-pointer"
                  onClick={() => handleLike(cmt.id)}
                >
                  <button>
                    <FaThumbsUp
                      color={cmt.isLike ? "red" : "white"}
                      size={12}
                      style={{
                        stroke: "black", // Viền ngoài màu đen
                        strokeWidth: "20", // Độ dày viền
                      }}
                    />
                  </button>
                  <span>Thích</span>
                </p>
                <p
                  className="cursor-pointer"
                  onClick={() => handleCommentId(cmt.id)}
                >
                  Trả lời
                </p>
              </div>
              {commentId == cmt.id && replay && (
                <div className="mt-3">
                  <form
                    onSubmit={(e) => handleSubmit(e, cmt.id)}
                    className="flex flex-col space-y-3"
                  >
                    <textarea
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Nhập bình luận của bạn..."
                      className="border p-2 rounded-md w-full h-20 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-blue-800 w-[150px] text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
                    >
                      Gửi bình luận
                    </button>
                  </form>
                </div>
              )}
              {cmt.reply &&
                cmt.reply.length > 0 &&
                cmt.reply.map((comment) => {
                  return (
                    <>
                      <div className="p-2  flex gap-3">
                        <div>
                          <img
                            src={comment.user.avatar || Avatar}
                            className="w-9 h-9"
                          />
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex gap-3">
                            <p className="font-semibold">
                              {" "}
                              {comment.user.name}
                            </p>
                            <p> {comment.content}</p>
                          </div>
                          <div className="flex gap-5 mt-2 text-[14px]">
                            <p
                              className="flex gap-2 cursor-pointer"
                              onClick={() => handleLike(comment.id)}
                            >
                              <button>
                                <FaThumbsUp
                                  color="white"
                                  size={12}
                                  style={{
                                    stroke: "black", // Viền ngoài màu đen
                                    strokeWidth: "20", // Độ dày viền
                                  }}
                                />
                              </button>
                              <span>Thích</span>
                            </p>
                            <p
                              className="cursor-pointer"
                              onClick={() => handleCommentId(comment.id)}
                            >
                              Trả lời
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
