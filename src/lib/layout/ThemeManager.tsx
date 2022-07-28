import CommonProps from '../common/models/CommonProps';
import { ThemeContextConsumer, ThemeContextProvider } from '../contexts';

interface Props extends CommonProps {}

function ThemeManager(props: Props) {
  const { children } = props;

  return (
    <ThemeContextProvider>
      <ThemeContextConsumer>
        {({ backgroundColor, textColor }) => (
          <div
            className={`absolute top-0 right-0 left-0 bottom-0 overflow-auto transition-colors ${backgroundColor} ${textColor}`}>
            {children}
          </div>
        )}
      </ThemeContextConsumer>
    </ThemeContextProvider>
  );
}

export default ThemeManager;
