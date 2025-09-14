import HeroCarousel from "@/components/website/hero-carousel";
import CategoryBar from "@/components/categoryBar/Categorybar";
import HomeClient from "@/components/HomeClient";
import { AxiosInstance } from "../(repositories)/config";
import axios from "axios";
export default async function Page() {
  let banners: any;
  const response = await axios.get(process.env.NEXT_PUBLIC_URL_API+"/api/hero-banners", {
    params: {
      category: "",
    },
  });
  if (response.status === 200) {
    banners = response.data?.data?.results || [];
  } else {
    banners = [];
  }
  const herosections = banners?.filter(
    (banner: any) => banner.section === "hero-section"
  );

  return (
    <main className="space-y-10 pt-16">
      <CategoryBar />
      <HeroCarousel banners={herosections} />
      <HomeClient />
    </main>
  );
}
