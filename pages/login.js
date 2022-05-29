import { getProviders, signIn } from "next-auth/react";
import React from "react";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            key={provider.name}
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >{`Login with ${provider.name}`}</button>
        ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
