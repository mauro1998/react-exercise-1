import Link from './Link';

interface Props {
  author: any;
}

function AuthorTile(props: Props) {
  const { author } = props;

  return (
    <li className="mb-6">
      <Link className="text-sm" href={`/author/${author.id}`}>
        @{author.username}
      </Link>
      <span className="block capitalize text-base font-medium">
        {author.name} — {author.company.name}
      </span>
      <span className="block text-sm font-normal">
        {author.email.toLowerCase()}
      </span>
    </li>
  );
}

export default AuthorTile;
