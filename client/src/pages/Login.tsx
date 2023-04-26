import { FormEvent, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { login, user } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);

  if (user != null) return <Navigate to="/" />;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (login.isLoading) return;

    const username = usernameRef.current?.value;
    if (username == null || username === "") {
      return;
    }

    login.mutate(username);
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="/icon.svg" alt="Your Company" />
          <h2 className="mt-10 text-center text-white text-2xl font-bold leading-9 tracking-tight">Sign in to chat</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  ref={usernameRef}
                  type="text"
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                disabled={login.isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                {login.isLoading ? "Loading" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
