import { useParams } from 'react-router-dom';
import { AuthorTile, Link } from '../common';
import Error from '../layout/Error';
import { useAuthors, usePosts } from '../states';

interface Props {}

function HomePage(props: Props) {
  const { query, authorId } = useParams();
  const post = usePosts({ query, authorId });
  const author = useAuthors({ authorId });
  const loading = post.state.loading || author.state.loading;
  const error = post.state.error || author.state.error;
  const { posts } = post.state;
  const { authors } = author.state;
  const hasQueryFilter = !!(query || '').trim();
  const hasAuthorFilter = !!(authorId || '').trim();
  const showBackButton = hasQueryFilter || hasAuthorFilter;

  const refresh = () => {
    post.refresh();
    author.refresh();
  };

  const getFilteredAuthor = () =>
    author.state.authors.length === 1 ? author.state.authors[0] : null;
  const user = getFilteredAuthor();
  const title = hasQueryFilter
    ? `Search results for "${query}"...`
    : hasAuthorFilter && user
    ? `${user.name} Posts (@${user.username})`
    : 'Posts';

  return loading ? (
    <>
      <h2 className="font-serif text-4xl mb-4">{title}</h2>
      <p>Loading...</p>
    </>
  ) : error ? (
    <>
      <h2 className="font-serif text-4xl mb-4">{title}</h2>
      <Error onTryAgain={refresh} details={error.message} />
    </>
  ) : (
    <div className="lg:grid grid-cols-[2fr,1fr] gap-4">
      <div>
        {showBackButton && (
          <Link className="mb-4" href="..">
            Back
          </Link>
        )}
        <h2 className="font-serif text-4xl mb-4">{title}</h2>
        {(posts.length && (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="mb-6">
                <Link
                  className="text-xl first-letter:capitalize font-semibold font-serif"
                  href={`/post/${post.id}`}>
                  {post.title}
                </Link>

                <p className="first-letter:capitalize text-sm mb-4">
                  {post.body}
                </p>
                <hr />
              </li>
            ))}
          </ul>
        )) || (
          <Error title="No posts found" message="No posts have been found." />
        )}
      </div>

      <div>
        <h2 className="font-serif text-4xl mb-4">Authors</h2>
        <ul>
          {(authors.length &&
            authors.map((author) => (
              <AuthorTile key={author.id} author={author} />
            ))) || (
            <Error
              title="No authors found"
              message="No authors have been found."
            />
          )}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
