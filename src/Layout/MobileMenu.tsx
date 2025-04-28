const menuItems = [
  { menu: "Home", path: "https://energhx.com/" },
  { menu: "About Us", path: "https://consulting.energhx.com/about-us/" },
  { menu: "Consulting", path: "https://consulting.energhx.com/" },
  { menu: "Research", path: "https://research.energhx.com/" },
  { menu: "EnerghxPlus", path: "https://energhxplus.energhx.com" },
  { menu: "Contact Us", path: "https://consulting.energhx.com/contact-us/" },
];
import { MdClose } from "react-icons/md";
interface MobileMenuProps {
  setIsOpen: (isOpen: boolean) => void;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ setIsOpen }) => {
  return (
    <div className=" bg-white  fixed top-0 right-0 h-full w-full sm:w-1/2  shadow md:hidden flex justify-between p-4 z-50 ">
      <ul className=" flex flex-col gap-4 ">
        {menuItems.map((item, i) => (
          <li key={i} className="">
            <a
              href={`${item.path}`}
              target="_blank"
              className={`relative px-4 py-2 group hover:text-primary`}
            >
              {item.menu}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-70"></span>
            </a>
          </li>
        ))}
      </ul>
      <div
        className=" cursor-pointer text-2xl"
        onClick={() => setIsOpen(false)}
      >
        <MdClose />
      </div>
    </div>
  );
};

export default MobileMenu;
