import { useParams } from 'react-router-dom';
import { AuthorTile, Link } from '../common';
import Error from '../layout/Error';
import { useAuthor, usePost } from '../states';

interface Props {}

function PostPage(props: Props) {
  const {} = props;
  const { postId } = useParams();
  const { state, refresh } = usePost(postId!);
  const { loading, error, post } = state;

  const { state: authorState, refresh: authorRefresh } = useAuthor(
    post?.userId,
  );
  const { loading: authorLoading, error: authorError, author } = authorState;

  return (
    <>
      <Link href="..">Back</Link>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <Error onTryAgain={refresh} details={error.message} />
      ) : (
        post && (
          <div className="lg:grid grid-cols-[2fr,1fr] gap-4">
            <div>
              <h1 className="font-serif text-4xl mb-4">{post.title}</h1>
              <p>{post.body}</p>
            </div>
            <div>
              {authorLoading ? (
                <div>loading...</div>
              ) : authorError ? (
                <Error onTryAgain={authorRefresh} details={error.message} />
              ) : (
                author && <AuthorTile key={author.id} author={author} />
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}

export default PostPage;
