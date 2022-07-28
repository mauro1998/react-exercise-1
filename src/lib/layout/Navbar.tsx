import { useNavigate } from 'react-router-dom';
import { Link } from '../common';
import SearchBar from './SearchBar';
import ThemeSwitcher from './ThemeSwitcher';

interface Props {}

function Navbar(props: Props) {
  const {} = props;
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    navigate(searchTerm ? `search/${searchTerm}` : '');
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <ThemeSwitcher />
      <nav className="flex justify-center items-center py-4">
        <Link href="/" className="mr-4">
          Blog
        </Link>
        <Link href="/login">Login</Link>
      </nav>
      <SearchBar onSubmit={handleSearch} />
    </div>
  );
}

export default Navbar;
