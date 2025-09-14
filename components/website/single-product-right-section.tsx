"use client";
import { useContext, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Separator } from "@/components/ui/separator";
import {
  Banknote,
  Check,
  CheckCircle,
  Heart,
  Lock,
  Minus,
  Plus,
  RefreshCcwDot,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AxiosInstance } from "@/app/(repositories)/config";
import { toast } from "sonner";
import { GlobalContext } from "@/app/context/GLobalContext";
import LoginCard from "./login-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterCard from "./regsiter-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SingleProductRightSection({
  product,
  setselectedVariantId,
}: any) {
  const { currentUser } = useContext(GlobalContext);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setselectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);

  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const addToCart = async () => {
    if (quantity < 1) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    const data = {
      product: product._id,
      qty: quantity,
      color: selectedColor,
      size: selectedSize,
      user: currentUser?.user._id,
    };

    // Validation check
    if (!data.color) {
      toast.error("Pleasse select a color");
      return;
    }

    if (!data.size) {
      toast.error("Pleasse select a size");
      return;
    }

    try {
      setAdding(true);
      const res = currentUser && (await AxiosInstance.post("/carts", data));
      setAdding(true);
      toast.success(res.data.msg);
      setSelectedSize("");
      setselectedColor("");
      router.push("/cart");
    } catch (error: any) {
      toast.error(error.response.data.msg);
      setAdding(true);
    }
  };

  const [selectedVariant, setSelectedVariant] = useState<any>();

  const selectColor = (name: any, _id: any) => {
    setselectedColor(name);
    // setselectedVariantId(_id);
  };

  const toggleWishlist = async () => {
    if (!currentUser) {
      toast.error("Please login to add to wishlist");
      return;
    }

    try {
      setWishlistLoading(true);
      if (isWishlisted) {
        // Remove from wishlist
        await AxiosInstance.delete(`/wishlist/${product._id}`);
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        // Add to wishlist
        await AxiosInstance.post("/wishlist", {
          product: product._id,
          user: currentUser?.user._id,
        });
        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  console.log(selectedColor);

  return (
    <>
      {product && (
        <div className=" text-neutral-700 space-y-3">
          <p className=" text-lg lg:text-3xl font-medium capitalize tracking-wide">
            {product.name}
          </p>
          <div className=" flex items-center justify-between">
            <p className=" text-sm tracking-wide">
              Category:{" "}
              <span className=" text-primary-500 ">
                {" "}
                {product?.category?.name}
              </span>
            </p>
            {/* <Rating
              style={{ maxWidth: 100 }}
              readOnly
              value={4.7}
            /> */}
          </div>
          <Separator />
          <div className=" flex items-end gap-4">
            <p className="text-lg lg:text-2xl text-primary-700/80 font-medium">
              Rs.{product.sp}
            </p>{" "}
            <span className="line-through font-medium">
              Rs.{product.sp + 0.2 * product.sp}
            </span>
          </div>
          <Separator />

          <p className=" tracking-wider  leading-relaxed text-neutral-700/80">
            {" "}
            {product.note}
          </p>

          <div className=" text-sm tracking-wider  text-neutral-700 space-y-4 ">
            <p className=" flex gap-1">
              <ShieldCheck size={18} />
              <span>High quality material </span>
            </p>

            <p className=" flex gap-1">
              <RefreshCcwDot size={18} />
              <span>30 Day Return Ploicy </span>
            </p>

            <p className=" flex gap-1">
              <Banknote size={18} />
              <span>Membership offer</span>
            </p>
          </div>

          {/* <div className="flex flex-wrap  pt-3 gap-4">
            {product?.colors?.map((color: any, index: number) => (
              <div
                key={index}
                onClick={() => selectColor(color.name, color._id)}
                className={`${color.name === selectedColor ? "border bg-primary-350 rounded-sm border-primary-800" : "border rounded-sm"} p-1  cursor-pointer flex items-center justify-center`}>
                <div
                  className={`${color.name === selectedColor ? "text-zinc-800 " : "text-neutral-700"}  uppercase font-medium w-4 h-4 rounded-full`}
                  style={{ backgroundColor: color.hex }}></div>
              </div>
            ))}
          </div> */}

          <div className="flex flex-wrap  pt-3 gap-4">
            {product?.colors?.map((color: any, index: number) => (
              <div
                key={index}
                onClick={() => selectColor(color.name, color._id)}
                className={`${
                  color.name === selectedColor
                    ? " border-2  bg-primary-350 rounded-full border-primary-800"
                    : "   rounded-full"
                } p-1    cursor-pointer flex items-center justify-center`}
                style={{
                  borderColor: color.hex,
                }}
              >
                <div
                  className={`${
                    color.name === selectedColor
                      ? "text-zinc-800 "
                      : "text-neutral-700"
                  }  uppercase font-medium h-2 w-2 rounded-full `}
                  //
                  style={{
                    // backgroundImage: `url(${color.image1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: color.hex,

                    // backgroundColor:color.hex,
                    // borderColor: color.name === selectedColor ? "#f9f9f9" : "#f9f9f9",
                  }}
                >
                  {/* <Image
                    src={color.image1}
                    alt="img"
                    width={500}
                    height={500}
                    className="rounded-md h-10 w-10 object-scale-down "
                  /> */}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap  pt-3 gap-4">
            {product.sizes.split(",").map((size: any, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedSize(size.trim())}
                className={`${
                  size.trim() === selectedSize
                    ? "text-white rounded-full bg-primary-800"
                    : "border rounded-full"
                } p-1 min-w-8 min-h-8  cursor-pointer flex items-center justify-center border-primary-300`}
              >
                <p
                  className={`${
                    size.trim() === selectedSize
                      ? "text-white "
                      : "text-neutral-700"
                  } rounded-sm uppercase font-medium text-xs`}
                >
                  {size.trim()}
                </p>
              </div>
            ))}
          </div>

          <div className=" flex items-center pt-3 gap-4">
            <div className=" flex items-center text-neutral-700 gap-2 border rounded-sm p-1">
              <Minus
                onClick={() => {
                  quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
                }}
                size={20}
                className=" cursor-pointer"
              />
              <Input
                type="number"
                defaultValue={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className=" w-8 px-2 h-7   rounded-sm border-0 shadow-none"
                min={1}
              />
              <Plus
                onClick={() => setQuantity(quantity + 1)}
                size={18}
                className=" cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3">
              {currentUser ? (
                <Button onClick={addToCart} className="rounded-full flex-1">
                  Add to cart
                </Button>
              ) : (
                <Link href="/login">
                  <Button className="rounded-full bg-primary-100 text-primary-950 hover:text-primary-200 flex gap-2">
                    <ShoppingCart size={18} /> Buy
                  </Button>
                </Link>
              )}
              
              {/* Wishlist Button */}
              <Button
                onClick={toggleWishlist}
                disabled={wishlistLoading}
                variant="outline"
                size="icon"
                className={`rounded-full border-2 transition-all duration-200 ${
                  isWishlisted 
                    ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100" 
                    : "border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <Heart 
                  size={18} 
                  className={`transition-all duration-200 ${
                    isWishlisted ? "fill-current" : ""
                  }`} 
                />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">Add to cart</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginCard />
          </TabsContent>

          <TabsContent value="register">
            <RegisterCard />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
