import { NavLink } from "react-router";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const {user,logout,deleteCurrentUser}=useAuth()
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light"
    );
    const profileRef = useRef(null);

    // Mock user — replace with your actual auth context
    // const user = {
    //     name: "John Snow",
    //     email: "john@example.com",
    //     photoURL: "https://i.pravatar.cc/150?img=12",
    // };

    // Apply theme to <html>
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Close profile modal on outside click
    useEffect(() => {
        const handler = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    const handleSignOut = () => {
        logout()
        Swal.fire({
  title: "Logout",
  text: "User Log out successfully",
  icon: "success"
});
        setProfileOpen(false);
    };

   // handle Delete User Func
  const handleDeleteUser = async() => {
try {
  await deleteCurrentUser()
  console.log('done')
} catch (error) {
    console.log(error)
}
console.log("btn click")
  }

    const navLinkClass = ({ isActive }) =>
        `relative text-sm font-medium tracking-wide transition-colors duration-200 pb-0.5
        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300
        ${isActive
            ? "text-primary after:w-full"
            : "text-base-content/70 hover:text-base-content after:w-0 hover:after:w-full"
        }`;

    const navLinks = (
        <>
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            <NavLink to="/allproducts" className={navLinkClass}>All Modals</NavLink>
            <NavLink to="/addmodals" className={navLinkClass}>Add Modals</NavLink>
            <NavLink to="/mymodals" className={navLinkClass}>My Modals</NavLink>
        </>
    );

    return (
        <nav className="w-full">
            <div className="flex items-center justify-between h-16 gap-4">

                {/* ── LEFT: Logo ── */}
                <NavLink
                    to="/"
                    className="flex-shrink-0 text-3xl font-extrabold tracking-tight text-base-content"
                >
                    <span className="text-primary ">3D</span>{" "}
                    <span>Modal Hub🎲</span>
                </NavLink>

                {/* ── MIDDLE: Nav links (desktop) ── */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks}
                </div>

                {/* ── RIGHT: Theme toggle + User ── */}
                <div className="flex items-center gap-3 flex-shrink-0">

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost btn-circle btn-sm"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            // Moon icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                            </svg>
                        ) : (
                            // Sun icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71M17.66 17.66l-.71-.71M6.34 6.34l-.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        )}
                    </button>

                    {/* User Avatar + Profile Modal */}
                    {user ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setProfileOpen((p) => !p)}
                                className="w-9 h-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 overflow-hidden transition-transform duration-200 hover:scale-105 focus:outline-none"
                                aria-label="Open profile"
                            >
                                <img
                                    src={user.photoURL}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </button>

                            {/* Profile Dropdown Modal */}
                            {profileOpen && (
                                <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl shadow-2xl bg-base-100 border border-base-200 overflow-hidden animate-[fadeIn_0.15s_ease]">

                                    {/* Header band */}
                                    <div className="bg-primary/10 px-5 pt-5 pb-4 flex flex-col items-center gap-3 border-b border-base-200">
                                        <div className="w-16 h-16 rounded-full ring-4 ring-primary/30 overflow-hidden">
                                            <img
                                                src={user.photoURL}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-base-content text-sm">{user.name}</p>
                                            <p className="text-xs text-base-content/50 mt-0.5">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-4 flex flex-col gap-2">
                                        <button
                                            onClick={handleSignOut}
                                            className="btn btn-outline btn-primary btn-sm w-full"
                                        >
                                            Sign Out
                                        </button>
                                        <button
                                            onClick={handleDeleteUser}
                                            className="btn btn-outline btn-error btn-sm w-full"
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (<>
                        <NavLink to="/signup" className="btn btn-primary btn-sm">
                            signup
                        </NavLink>
                          <NavLink to="/login" className="btn btn-primary btn-sm">
                            Login
                        </NavLink>

                      </>
                    )}

                    {/* ── Hamburger (mobile) ── */}
                    <button
                        onClick={() => setMenuOpen((p) => !p)}
                        className="md:hidden btn btn-ghost btn-circle btn-sm"
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu Dropdown ── */}
            {menuOpen && (
                <div className="md:hidden border-t border-base-200 py-3 flex flex-col gap-4 px-1 pb-4">
                    <div
                        className="flex flex-col gap-4"
                        onClick={() => setMenuOpen(false)}
                    >
                        {navLinks}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;