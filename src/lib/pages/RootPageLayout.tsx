import CommonProps from '../common/models/CommonProps';
import Navbar from '../layout/Navbar';

interface Props extends CommonProps {}

function RootPageLayout(props: Props) {
  const { children } = props;
  return (
    <div className="container mx-auto px-4">
      <header>
        <Navbar />
        <hr className="mb-4" />
      </header>
      <main>{children}</main>
    </div>
  );
}

export default RootPageLayout;
