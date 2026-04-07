import AutoLogout from "app/components/AutoLogout";
import PlatformCards from "./PlatformCards";

const Plataformas = () => {
  return (
    <div className="container">
      <PlatformCards />
      <AutoLogout/>
    </div>
  );
}

export default Plataformas