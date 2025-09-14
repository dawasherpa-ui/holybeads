import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  img: string;
  name: string;
  link: string;
}

function CategoryItem({ link, name, img }: CategoryItemProps) {
  return (
    <Link href={link} className="self-baseline">
      <div className="flex flex-row gap-2 border  items-center bg-[#f3f3f3] p-1 rounded-md">
        <div className=" flex justify-center w-10 lg:w-18 h-10 lg:h-18 bg-slate-100 hover:bg-slate-200 rounded-xl">
          <Image
            className="w-full h-full rounded-sm object-cover object-top"
            src={img}
            width={100}
            height={100}
            alt={name}
          />
        </div>
        <div className=" flex justify-center ">
          <div className="flex flex-col ">
            <h2 className="text-sm lg:text-base lg:leading-4 font-semibold text-black/90">{name}</h2> {/* <br/> */}
            <span className="text-[12px] font-medium">Collection</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default CategoryItem;
