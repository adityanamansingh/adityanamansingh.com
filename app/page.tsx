import Header from "@/components/Header";
import Bento from "@/components/Bento";
import { getImages } from "@/lib/images";

export default function Page() {
  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-brand px-4 py-2 font-medium text-on-brand focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
      <Header />
      <Bento images={getImages()} />
    </>
  );
}
