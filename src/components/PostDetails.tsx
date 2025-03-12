import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  isFormOpen: boolean;
  setIsFormOpen: (value: boolean) => void;
  selectedUserPost: Post;
  errorMessageCm: string;
  userComment: Comment[];
  isCommentLoading: boolean;
};

export const PostDetails: React.FC<Props> = ({
  isFormOpen,
  setIsFormOpen,
  selectedUserPost,
  errorMessageCm,
  userComment,
  isCommentLoading,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedUserPost.id}: ${selectedUserPost.title}`}
          </h2>

          <p data-cy="PostBody">{selectedUserPost.body}</p>
        </div>

        <div className="block">
          {isCommentLoading && <Loader />}

          {!isCommentLoading && errorMessageCm && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessageCm}
            </div>
          )}

          {!isCommentLoading && userComment.length === 0 && !errorMessageCm && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {userComment.length > 0 && !isCommentLoading && !errorMessageCm && (
            <>
              {' '}
              <p className="title is-4">Comments:</p>
              {userComment.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!isCommentLoading && !isFormOpen && !errorMessageCm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpen && !isCommentLoading && <NewCommentForm />}
      </div>
    </div>
  );
};
