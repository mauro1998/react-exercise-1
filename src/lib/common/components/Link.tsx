import { NavLink } from 'react-router-dom';
import { useThemeContext } from '../../contexts';
import CommonProps from '../models/CommonProps';

interface Props extends CommonProps {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

function Link(props: Props) {
  const { href = '#', children, className, onClick } = props;
  const { isDarkTheme } = useThemeContext();
  const color = isDarkTheme
    ? 'text-sky-400 active:text-sky-500'
    : 'text-sky-600 active:text-sky-700';

  return (
    <NavLink
      className={`inline-block cursor-pointer transition-colors hover:underline ${color} ${className}`}
      to={href}
      onClick={onClick}>
      {children}
    </NavLink>
  );
}

export default Link;
