import {Link} from 'react-router-dom';
import {PlusCircle} from '@phosphor-icons/react';

export function NewTweak() {
  return (
    <Link to="/tweak/new" className="fixed bottom-20 right-4">
      <PlusCircle className="w-16 h-16 text-white" weight="fill" />
    </Link>
  );
}
