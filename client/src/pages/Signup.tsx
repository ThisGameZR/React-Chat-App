import { FormEvent, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export function Signup() {
  const { signup } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (signup.isLoading) return;

    const username = usernameRef.current?.value;
    const name = username;
    const imageUrl = imageUrlRef.current?.value;
    if (username == null || username === "" || name == null || name === "") {
      return;
    }

    signup.mutate({ id: username, name, image: imageUrl });
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
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-white">
                Image URL
              </label>
              <div className="mt-2">
                <input
                  name="image"
                  ref={imageUrlRef}
                  type="text"
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                disabled={signup.isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                {signup.isLoading ? "Loading.." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
