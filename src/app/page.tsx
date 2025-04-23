import Carousel from "app/components/Carousel";
import Footer from "app/components/Footer";
import InstagramPosts from "app/components/InstagramPosts";

export default function Home() {
  return (
    <div>
      <Carousel />
      <InstagramPosts url="https://www.instagram.com/reel/DCvCdZWh2S9/?utm_source=ig_web_copy_link" />
      <Footer />
    </div>
  );
}
