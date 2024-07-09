import { CarouselData } from "@/components/ui/CarouselData";
import SnackBar from "@/components/ui/SnackBar";
import { Button } from "@/components/ui/button";
import { SnackBarContext } from "@/context/SnackBarContext";
import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const carouselDivs = [
  {
    title: "Simplified Task Management",
    body: "TaskEase makes managing tasks a breeze with its intuitive interface, ensuring nothing slips through the cracks.",
  },
  {
    title: "Boosted Productivity",
    body: "Stay on top of your workload with smart features like task prioritization, deadlines, and reminders.",
  },
  {
    title: "Collaborative Tools",
    body: "Share tasks, assign responsibilities, and monitor progress for seamless team collaboration.",
  },
  {
    title: "Accessible Anywhere",
    body: "Access TaskEase from any device and sync tasks across all your devices, whether at your desk or on the go.",
  },
  {
    title: "Customizable Workflow",
    body: "Tailor TaskEase to fit your unique workflow with customizable task views and flexible settings.",
  },
];

function HomePage() {
  const { user } = useContext(UserContext);
  const { snackBar } = useContext(SnackBarContext);
  return (
    <>
      <section className=" items-center p-2 rounded-md bg-gradient-to-r from-background  to-blue-100  break-950px:flex break-950px:py-20 break-950px:shadow-md">
        <div className=" order-2 max-h-600">
          <img
            className=" mx-auto order-last"
            src="https://procomservices.com/wp-content/uploads/2022/03/Hero_Section_Image.webp"
            alt=""
          />
        </div>
        <header className=" pb-10 flex flex-col gap-4 order-1 break-950px:pl-12 break-950px:pb-0 ">
          <h2 className=" text-4xl font-bold">
            Manage Your Tasks with Ease Using TaskEase!
          </h2>
          <p className=" text-xl">
            Simplify task management with TaskEase. Stay organized and boost
            productivity effortlessly.
          </p>
          <Button className=" max-w-36" asChild>
            {user ? (
              <Link to={"/user"}>To Your Tasks</Link>
            ) : (
              <Link to={"/auth"}>Sign up now </Link>
            )}
          </Button>
        </header>
      </section>
      <section className=" overflow-hidden my-12">
        <CarouselData itemsList={carouselDivs} />
      </section>
      <section></section>
      {snackBar.display && <SnackBar />}
    </>
  );
}

export default HomePage;
