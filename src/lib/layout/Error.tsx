import { MouseEvent } from 'react';
import { Link } from '../common';

interface Props {
  title?: string;
  message?: string;
  details?: string;
  onTryAgain?: () => void;
}

function Error(props: Props) {
  const {
    title = 'Oops! Something went wrong.',
    message,
    details,
    onTryAgain,
  } = props;

  const handleTryAgain = (event: MouseEvent) => {
    event.preventDefault();
    if (onTryAgain) onTryAgain();
  };

  return (
    <div>
      <h2 className="text-xl font-serif font-medium mb-2">{title}</h2>
      <p className="text-sm font-sans font-normal leading-tight mb-2">
        {message || (
          <>
            An error ocurred while performing this action.
            <br /> Please{' '}
            <Link className="text-sm leading-tight" onClick={handleTryAgain}>
              try again
            </Link>
            .
          </>
        )}
      </p>
      {details && (
        <details className="">
          <summary className="text-sm select-none mb-2">Details</summary>
          <code className="bg-slate-100 text-slate-800 inline-block px-4 py-2 text-xs border-dashed border-2 font-mono">
            {details}
          </code>
        </details>
      )}
    </div>
  );
}

export default Error;
