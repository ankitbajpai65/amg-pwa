const Login = () => {
  return (
    <>
      <div className="mobile:w-full max-w-md min-w-min w-3/6 m-2 p-2 flex flex-col items-center mx-auto m-2 p-2 bg-gray-200 rounded-md">
        <div className="bg-red-600 rounded text-white font-semibold mb-2 w-full text-center">
          <div className="flex justify-around ">
            <p>AMG</p>
            <img src="/"></img>
          </div>
          <p>Login</p>
        </div>
        <div className="m-2">
          <div className="mb-1 flex flex-col">
            <label htmlFor="email" className="pr-2">
              Email
            </label>
            <input
              className="rounded border-2 border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
            />
          </div>
          <div className="mb-2 flex flex-col">
            <label htmlFor="password" className="pr-2">
              Password
            </label>
            <input
              className="rounded border-2 border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500"
              type="password"
              id="Password"
            />
          </div>
        </div>
        <button className="rounded-xl bg-red-600 p-2 m-2 border text-white font-medium mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500 active:bg-red-700">
          Confirm
        </button>
        <div className="flex flex-col m-2">
          <a
            className="text-blue-600 underline transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
            href=""
          >
            change password
          </a>

          <a
            className="text-blue-600 underline transition duration-150 ease-in-out
        hover:text-red-600 focus:text-red-600 active:text-red-700"
            href=""
          >
            Forgot Password
          </a>
        </div>
        <div className="rounded bg-red-600 h-8 w-full"></div>
      </div>
    </>
  );
};
export default Login;
