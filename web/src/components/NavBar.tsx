import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { SignOut } from "@phosphor-icons/react";

import { usersActions, selectUser } from "../store/users/user.slice";

export const NavBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  function logout() {
    dispatch(usersActions.clearStateUser());
    router.push("/");
  }

  return (
    <nav className='flex items-center justify-between px-12 text-white h-16 w-full border-b border-gray-700'>
      <span className='text-white font-semibold text-xl'>My Finances</span>

      <div className='flex items-center justify-evenly gap-4 w-52 h-full'>
        <div className='flex flex-col items-end justify-center w-32 h-8'>
          <p className='text-sm font-semibold text-zinc-400'>{user.name}</p>
        </div>

        <div className='w-11 h-11 flex items-center justify-center rounded-full bg-violet-600 cursor-pointer'>
          <span className='text-white font-bold text-base uppercase'>
            {user.name.substr(0, 2)}
          </span>
        </div>

        <SignOut className='cursor-pointer' size={28} onClick={logout} />
      </div>
    </nav>
  );
};
