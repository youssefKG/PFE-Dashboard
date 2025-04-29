import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "../../components/common/breadcrumbs";
import CategoryCard from "../../components/containers/categoryCard";
import { useState } from "react";
import CreateCategoryBackDrop from "../../components/containers/createCategoryBackDrop";

type Category = {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
};

const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    description:
      "Devices and tech gadgets like phones, laptops, and accessories",
    imgUrl:
      "https://imgs.search.brave.com/PIdhsBNb9MOB387RQjlfDzwCnL1mb21oTpVfSiXjgjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/NzUyOTY4My9waG90/by9jb21wdXRlci1n/ZW5lcmF0ZWQtaW1h/Z2Utb2YtYmF0aHJv/b20taW50ZXJpb3Iu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUd4dFU2QTlvcHJU/dE5jTkNiMlZFZjlR/akQyOThheXVlX0tw/LUlRNGcyQlk9",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Clothing, shoes, and accessories for men and women",
    imgUrl:
      "https://imgs.search.brave.com/PIdhsBNb9MOB387RQjlfDzwCnL1mb21oTpVfSiXjgjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/NzUyOTY4My9waG90/by9jb21wdXRlci1n/ZW5lcmF0ZWQtaW1h/Z2Utb2YtYmF0aHJv/b20taW50ZXJpb3Iu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUd4dFU2QTlvcHJU/dE5jTkNiMlZFZjlR/akQyOThheXVlX0tw/LUlRNGcyQlk9",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    description: "Furniture, appliances, and cooking essentials",
    imgUrl:
      "https://imgs.search.brave.com/PIdhsBNb9MOB387RQjlfDzwCnL1mb21oTpVfSiXjgjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/NzUyOTY4My9waG90/by9jb21wdXRlci1n/ZW5lcmF0ZWQtaW1h/Z2Utb2YtYmF0aHJv/b20taW50ZXJpb3Iu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUd4dFU2QTlvcHJU/dE5jTkNiMlZFZjlR/akQyOThheXVlX0tw/LUlRNGcyQlk9",
  },
  {
    id: 4,
    name: "Beauty & Personal Care",
    description: "Skincare, makeup, and grooming products",
    imgUrl:
      "https://imgs.search.brave.com/PIdhsBNb9MOB387RQjlfDzwCnL1mb21oTpVfSiXjgjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/NzUyOTY4My9waG90/by9jb21wdXRlci1n/ZW5lcmF0ZWQtaW1h/Z2Utb2YtYmF0aHJv/b20taW50ZXJpb3Iu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUd4dFU2QTlvcHJU/dE5jTkNiMlZFZjlR/akQyOThheXVlX0tw/LUlRNGcyQlk9",
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    description: "Equipment and gear for fitness and outdoor activities",
    imgUrl:
      "https://imgs.search.brave.com/PIdhsBNb9MOB387RQjlfDzwCnL1mb21oTpVfSiXjgjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/NzUyOTY4My9waG90/by9jb21wdXRlci1n/ZW5lcmF0ZWQtaW1h/Z2Utb2YtYmF0aHJv/b20taW50ZXJpb3Iu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUd4dFU2QTlvcHJU/dE5jTkNiMlZFZjlR/akQyOThheXVlX0tw/LUlRNGcyQlk9",
  },
  {
    id: 6,
    name: "Books & Stationery",
    description: "Educational books and office supplies",
    imgUrl:
      "https://imgs.search.brave.com/PIdhsBNb9MOB387RQjlfDzwCnL1mb21oTpVfSiXjgjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/NzUyOTY4My9waG90/by9jb21wdXRlci1n/ZW5lcmF0ZWQtaW1h/Z2Utb2YtYmF0aHJv/b20taW50ZXJpb3Iu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUd4dFU2QTlvcHJU/dE5jTkNiMlZFZjlR/akQyOThheXVlX0tw/LUlRNGcyQlk9",
  },
  {
    id: 7,
    name: "Toys & Games",
    description: "Fun and educational products for children",
    imgUrl:
      "https://imgs.search.brave.com/PIdhsBNb9MOB387RQjlfDzwCnL1mb21oTpVfSiXjgjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/NzUyOTY4My9waG90/by9jb21wdXRlci1n/ZW5lcmF0ZWQtaW1h/Z2Utb2YtYmF0aHJv/b20taW50ZXJpb3Iu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUd4dFU2QTlvcHJU/dE5jTkNiMlZFZjlR/akQyOThheXVlX0tw/LUlRNGcyQlk9",
  },
  {
    id: 8,
    name: "Groceries",
    description: "Everyday food items and beverages",
    imgUrl:
      "https://imgs.search.brave.com/PIdhsBNb9MOB387RQjlfDzwCnL1mb21oTpVfSiXjgjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/NzUyOTY4My9waG90/by9jb21wdXRlci1n/ZW5lcmF0ZWQtaW1h/Z2Utb2YtYmF0aHJv/b20taW50ZXJpb3Iu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUd4dFU2QTlvcHJU/dE5jTkNiMlZFZjlR/akQyOThheXVlX0tw/LUlRNGcyQlk9",
  },
  {
    id: 9,
    name: "Automotive",
    description: "Car and motorbike accessories and tools",
    imgUrl:
      "https://imgs.search.brave.com/PIdhsBNb9MOB387RQjlfDzwCnL1mb21oTpVfSiXjgjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/NzUyOTY4My9waG90/by9jb21wdXRlci1n/ZW5lcmF0ZWQtaW1h/Z2Utb2YtYmF0aHJv/b20taW50ZXJpb3Iu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUd4dFU2QTlvcHJU/dE5jTkNiMlZFZjlR/akQyOThheXVlX0tw/LUlRNGcyQlk9",
  },
  {
    id: 10,
    name: "Pets",
    description: "Products and food for domestic animals",
    imgUrl:
      "https://imgs.search.brave.com/PIdhsBNb9MOB387RQjlfDzwCnL1mb21oTpVfSiXjgjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/NzUyOTY4My9waG90/by9jb21wdXRlci1n/ZW5lcmF0ZWQtaW1h/Z2Utb2YtYmF0aHJv/b20taW50ZXJpb3Iu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUd4dFU2QTlvcHJU/dE5jTkNiMlZFZjlR/akQyOThheXVlX0tw/LUlRNGcyQlk9",
  },
];

const Category = () => {
  const [isCreateCategoryBackDropOpen, setIsCreateCategoryBackDropOpen] =
    useState<boolean>(true);
  return (
    <div className="flex flex-col gap-2 p-2  py-6 mb-16">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex flex-col gap-2 ">
          <div>
            <h1 className="font-extrabold text-2xl">All Category</h1>
          </div>
          <Breadcrumb links={[{ value: "Category", to: "/category" }]} />
        </div>
        <div
          className="flex justify-between px-4 p-2 w-full max-w-xl text-sm
       rounded-md text-gray-600 bg-white border border-gray-200 "
        >
          <input
            placeholder="Search for category"
            className="outline-none flex-1 bg-transparent"
          />
          <MagnifyingGlassIcon className="size-5 " />
        </div>
      </div>
      <div className="flex mt-12 gap-4 flex-wrap">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            name={cat.name}
            id={cat.id}
            description={cat.description}
            imgUrl={cat.imgUrl}
          />
        ))}
      </div>
      <button
        onClick={() => setIsCreateCategoryBackDropOpen(true)}
        className="absolute bottom-9 right-6 p-3  rounded-full
      hover:opacity-80 transition-all  bg-blue-800 text-white"
      >
        <PlusIcon className="size-8" />
      </button>
      {isCreateCategoryBackDropOpen && (
        <CreateCategoryBackDrop
          handleClose={() => {
            setIsCreateCategoryBackDropOpen(false);
          }}
          isOpen={isCreateCategoryBackDropOpen}
        />
      )}
    </div>
  );
};

export default Category;
