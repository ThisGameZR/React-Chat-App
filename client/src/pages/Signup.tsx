import { FormEvent, useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../context/AuthContext";

export function Signup() {
  const { signup } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (signup.isLoading) return;

    const username = usernameRef.current?.value;
    const name = nameRef.current?.value;
    const imageUrl = imageUrlRef.current?.value;
    if (username == null || username === "" || name == null || name === "") {
      return;
    }

    signup.mutate({ id: username, name, image: imageUrl });
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
      >
        <label htmlFor="userName" className="text-white">
          Username
        </label>
        <Input id="userName" pattern="\S*" required ref={usernameRef} />
        <label htmlFor="name" className="text-white">
          Name
        </label>
        <Input id="name" required ref={nameRef} />
        <label htmlFor="imageUrl" className="text-white">
          Image Url
        </label>
        <Input id="imageUrl" type="url" ref={imageUrlRef} />
        <Button disabled={signup.isLoading} type="submit" className="col-span-full">
          {signup.isLoading ? "Loading.." : "Sign Up"}
        </Button>
      </form>
    </>
  );
}
