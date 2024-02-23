import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavBarItem from "./NavBarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
import { useTranslation } from "@/app/i18n/client";

const TOP_OFFSET = 66;

const NavBar = () => {
  const { t } = useTranslation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground , setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY >= TOP_OFFSET)
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(currentValue => !currentValue);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu(currentValue => !currentValue);
  }, []);

  return (
    <nav className="w-full fixed z-40 ">
      <div className={`
        px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
      `}>
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
        <div className="
          flex-row
          ml-8
          gap-7
          hidden
          lg:flex
        ">
          <NavBarItem label={t('menu.home')} />
          <NavBarItem label={t('menu.series')} />
          <NavBarItem label={t('menu.films')} />
          <NavBarItem label={t('menu.new_popular')} />
          <NavBarItem label={t('menu.my_list')} />
          <NavBarItem label={t('menu.browse_by_languages')} />
        </div>
        <div className="
          lg:hidden
          flex
          flex-row
          items-center
          gap-2
          ml-8
          cursor-pointer
          relative
        " onClick={toggleMobileMenu}>
          <p className="text-white text-sm">{t('browse')}</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} /> 
          <MobileMenu visible={showMobileMenu} /> 
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="Profile" />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
 