import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6
      bg-gradient-to-br from-emerald-100 via-green-100 to-teal-200">

      <div
        className="w-full max-w-2xl rounded-3xl
        px-12 py-16 text-center
        backdrop-blur-md
        bg-white/40
        border border-white/50
        shadow-2xl shadow-emerald-500/20"
      >
        {/* Title */}
        <h2 className="text-5xl font-extrabold text-emerald-9000">
          Welcome to Commerce Web App
        </h2>

        <p className="mt-3 text-lg text-emerald-800/70">
          Select your login option
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-6 mt-12">

          {/* User Login */}
          <Link to="/login/user" className="w-full">
            <button
              className="w-full h-14 rounded-xl
              text-white font-semibold text-base
              bg-gradient-to-r from-emerald-700 to-emerald-500
              shadow-lg shadow-emerald-500/40
              transition-all duration-200
              hover:scale-[1.03]
              active:scale-[0.97]"
            >
              User Login
            </button>
          </Link>

          {/* Admin Login */}
          <Link to="/login/admin" className="w-full">
            <button
              className="w-full h-14 rounded-xl
              font-semibold text-base
              border-2 border-emerald-600
              text-emerald-800
              bg-white/60
              transition-all duration-200
              hover:bg-white/80
              hover:scale-[1.03]
              active:scale-[0.97]"
            >
              Admin Login
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}
