"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import EmblaCarouselReact from "embla-carousel-react";
import companies from "@/data/companies.json";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing icons

export default function EmblaCarousel() {
  const [emblaRef, embla] = EmblaCarouselReact({ loop: true, align: "start" });
  const previousRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (embla) {
      const onNextClick = () => embla.scrollNext();
      const onPrevClick = () => embla.scrollPrev();

      const nextButton = nextRef.current;
      const prevButton = previousRef.current;

      if (nextButton && prevButton) {
        nextButton.addEventListener("click", onNextClick);
        prevButton.addEventListener("click", onPrevClick);

        return () => {
          nextButton.removeEventListener("click", onNextClick);
          prevButton.removeEventListener("click", onPrevClick);
        };
      }
    }
  }, [embla]);

  return (
    <div className="px-8">
      <h2 className="text-4xl font-bold font-eczar uppercase flex justify-center items-center py-10 text-center font-eczar">
        {" "}
        Embla Carousel{" "}
      </h2>
      <div className="relative container mx-auto">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {companies.map((company, index) => (
              <div
                className="embla__slide flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                key={index}
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-3xl font-semibold uppercase font-eczar">
                        {company.name}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Button */}
        <button
          ref={previousRef}
          className="embla__prev absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Next Button */}
        <button
          ref={nextRef}
          className="embla__next absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
