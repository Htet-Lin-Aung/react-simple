import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch } from "../../store";
import { logout } from "../../store/reducers/auth.reducer";
import { toast } from 'react-toastify';

const Navbar = ({ isAuthorized }: { isAuthorized: boolean }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    toast.success('Successfully logout!', { position: toast.POSITION.TOP_RIGHT });
  };

  const GuestLinks = () => {
    return (
      <>
        <NavLink to="/login" className="aria-[current=page]:text-blue-400">Login</NavLink>
        <NavLink to="/register" className="aria-[current=page]:text-blue-400">Register</NavLink>
      </>
    );
  }
  
  const AuthLinks = () => {
    return (
      <>
        <NavLink to="/dashboard" className="aria-[current=page]:text-blue-400">Dashboard</NavLink>
        <NavLink to="/blog" className="aria-[current=page]:text-blue-400">Blog</NavLink>
        <NavLink to="/logout" onClick={handleLogout} className="aria-[current=page]:text-blue-400">Logout</NavLink>
      </>
    );
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <NavLink to="/" className="aria-[current=page]:text-blue-400">Home</NavLink>
      <div className="flex space-x-4">
        {isAuthorized ? <AuthLinks /> : <GuestLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
