import * as React from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselData({ itemsList }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className=" w-[70%] md:w-[80%] mx-auto border p-4  rounded-md bg-slate-50"
    >
      <CarouselContent>
        {itemsList.map((item, index) => (
          <CarouselItem
            key={index}
            className="break-650px:basis-1/2 break-1000px:basis-1/3  "
          >
            <Card className="overflow-hidden h-full p-0">
              <CardContent className=" flex flex-col gap-2 aspect-square items-center justify-center text-center py-6">
                <CardTitle className=" text-xl ">{item.title}</CardTitle>
                <span className="  text-sm">{item.body}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
