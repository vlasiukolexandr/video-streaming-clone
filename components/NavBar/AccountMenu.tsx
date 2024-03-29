import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "@/app/i18n/client";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const session = useSession();
  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flax-row gap-3 items-center w-full">
          <img className="w-8 rounded-md" src={!!session?.data?.user?.image ? session?.data?.user?.image : "/images/default-blue.png"} alt="Profile" />
          <p className="text-white text-sm group-hover/item:underline">{session?.data?.user?.name}</p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
          {t('sign_out')}
        </div>
      </div>
    </div>
  );
}

export default AccountMenu;
