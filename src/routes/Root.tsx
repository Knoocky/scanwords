import { Outlet } from 'react-router-dom';
import './root.css';

export const Root = () => {
  return (
    <div className="root">
      <Outlet />
    </div>
  );
};
