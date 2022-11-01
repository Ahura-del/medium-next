import { FormEvent, useEffect, useState } from "react";
interface Data {
  data: {
    name: string;
    email: string;
    comment: string;
  };
}
function Comment() {
  const [name, nameSet] = useState<string>("");
  const [email, emailSet] = useState<string>("");
  const [comment, commentSet] = useState<string>("");
  const [error, errorSet] = useState<boolean>(false);
  const [msg, msgSet] = useState<boolean>(false);
  const commentHandler = async (e: FormEvent) => {
    e.preventDefault();
    errorSet(false);
    msgSet(false);
    if (name === "" || email === "" || comment === "") {
      errorSet(true);
      return;
    } else {
      const reqData: Data = {
        data: { name, email, comment },
      };
      await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });

      nameSet("");
      emailSet("");
      commentSet("");
      msgSet(true);
    }
  };

  useEffect(() => {
    if (error || msg) {
      setInterval(() => {
        errorSet(false);
        msgSet(false);
      }, 8000);
    }
  }, [error, msg]);

  return (
    <form onSubmit={commentHandler}>
      <div className="mb-10">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => nameSet(e.target.value)}
          placeholder="John Dow"
          className="w-full border p-2 focus:ring focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
          autoComplete="off"
        />
      </div>
      <div className="mb-10">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => emailSet(e.target.value)}
          placeholder="Example@example.com"
          className="w-full border p-2 focus:ring focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="comment" className="block mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          rows={10}
          value={comment}
          onChange={(e) => commentSet(e.target.value)}
          className="w-full border p-2 focus:ring focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none resize-none"
          autoComplete="off"
        ></textarea>
      </div>
      {error && (
        <p className="py-5 text-center text-red-500 text-lg font-medium">
          Please fill all fields with correct value.
        </p>
      )}
      {msg && (
        <p className="py-5 text-center text-green-500 text-lg font-medium">
          After review your comment , you can see your comment.
        </p>
      )}
      <button
        type="submit"
        className="my-5 w-full py-3 bg-yellow-500 text-xl text-white outline-none focus:outline-none hover:cursor-pointer transition-colors duration-200 hover:bg-yellow-400"
      >
        Send
      </button>
    </form>
  );
}

export default Comment;
