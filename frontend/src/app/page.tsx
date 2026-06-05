import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Hero } from "@/components/sections/Hero";

const Booking = dynamic(
  () => import("@/components/sections/Booking").then((m) => m.Booking),
  { loading: () => <SectionSkeleton /> }
);
const Services = dynamic(
  () => import("@/components/sections/Services").then((m) => m.Services),
  { loading: () => <SectionSkeleton /> }
);
const Treatments = dynamic(
  () => import("@/components/sections/Treatments").then((m) => m.Treatments),
  { loading: () => <SectionSkeleton /> }
);
import { GalleryWrapper } from "@/components/sections/GalleryWrapper";
const Testimonials = dynamic(
  () =>
    import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { loading: () => <SectionSkeleton /> }
);
const WhyChooseUs = dynamic(
  () => import("@/components/sections/WhyChooseUs").then((m) => m.WhyChooseUs),
  { loading: () => <SectionSkeleton /> }
);
const FinalCTA = dynamic(
  () => import("@/components/sections/FinalCTA").then((m) => m.FinalCTA),
  { loading: () => <SectionSkeleton /> }
);
const Promotions = dynamic(
  () =>
    import("@/components/sections/Promotions").then(
      (m) => m.Promotions
    ),
  { loading: () => <SectionSkeleton /> }
);
function SectionSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <div className="skeleton mb-8 h-10 w-64 rounded-2xl mx-auto" />
      <div className="skeleton h-48 w-full rounded-3xl" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Booking />
        <Services />
        <Treatments />
        <Promotions />
        <GalleryWrapper />
        <Testimonials />
        <WhyChooseUs />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
