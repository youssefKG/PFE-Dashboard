import { FC } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type LinkType = {
  value: string;
  to: string;
};

interface IBreadCrumbsProps {
  links: LinkType[];
}

const Breadcrumb: FC<IBreadCrumbsProps> = ({ links }) => {
  return (
    <div className="flex items-center gap-px text-xs font-medium">
      <div className="flex items-center gap-1  text-xs text-gray-400">
        <HomeIcon className="size-5" />
        <p className="">Home</p>
      </div>
      <ChevronRightIcon className="size-4" />
      {links.map((link: LinkType, i: number) => {
        if (i != links.length - 1)
          return (
            <>
              <Link to={link.to}>
                <p className="">{link.value}</p>
              </Link>
              <ChevronRightIcon className="size-4" />
            </>
          );
        return (
          <Link to={link.to}>
            <p className="text-blue-600 font-medium">{link.value}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
