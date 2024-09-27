import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { fetchData } from "@/hooks";
import Image from "next/image";
import PriceFormat from "./PriceFormate";

const SearchInput = () => {
      const [searchQuery, setSearchQuery] = useState("");
      const [products, setProducts] = useState([]);
      const [isInputFocused, setIsInputFocused] = useState(false); // New state to manage input focus
      const searchContainerRef = useRef(null); // Ref to detect clicks outside
      useEffect(() => {
            const getDatas = async () => {
                  const endpoint = "https://dummyjson.com/products";
                  try {
                        const data = await fetchData(endpoint);
                        setProducts(data?.products);
                  } catch (error) {
                        console.error("Error fetching data", error);
                  }
            };
            getDatas();
      }, [products]);

      const [filteredProducts, setFilteredProducts] = useState([]);

      useEffect(() => {
            const filtered = products.filter((item) =>
                  item?.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
      }, [searchQuery]);
      // Effect to detect click outside
      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (
                        searchContainerRef.current &&
                        // @ts-ignore
                        !searchContainerRef.current.contains(event.target)
                  ) {
                        setIsInputFocused(false); // Hide the list if clicking outside
                  }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                  document.removeEventListener("mousedown", handleClickOutside);
            };
      }, []);

      return (
            <div
                  ref={searchContainerRef}
                  className="h-10 mx-4 hidden w-[500px] md:inline-flex items-center justify-between relative"
            >
                  <input
                        className="w-full h-full px-4 pr-10  placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazonOrange"
                        type="text"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        placeholder="Search amazon"
                        onFocus={() => setIsInputFocused(true)} // Set focus state
                  />

                  {searchQuery && (
                        <MdOutlineClose
                              onClick={() => setSearchQuery("")}
                              className="text-xl text-amazonLight hover:text-red-600 absolute right-14 duration-200 cursor-pointer"
                        />
                  )}

                  <span className="w-12 h-full bg-amazonOrange text-gray-600 hover:bg-amazonOrangeDark duration-200 cursor-pointer  text-2xl flex items-center justify-center absolute right-0">
                        <HiOutlineSearch size={20} />
                  </span>

                  {/*  ============= Searchfield start here ========== */}
                  {isInputFocused && searchQuery && (
                        <div className="absolute left-0 top-12 w-full mx-auto h-auto max-h-96 bg-white rounded-md overflow-y-scroll cursor-pointer text-black">
                              {filteredProducts?.length > 0 ? (
                                    <div className="flex flex-col">
                                          {filteredProducts?.map((item) => (
                                                <Link
                                                      key={item?.id}
                                                      href={{
                                                            pathname: `/product/${item?.id}`,
                                                            query: { id: item?.id },
                                                      }}
                                                      onClick={() => setSearchQuery("")}
                                                      className="flex items-center gap-x-2 text-base font-medium hover:bg-lightText/30 px-3 py-1.5"
                                                >
                                                      {/* Product Image */}
                                                      <Image
                                                            className="h-14 w-14 border border-gray-300"
                                                            src={item?.images[0]}
                                                            alt={item?.title}
                                                            width={200}
                                                            height={200}
                                                      />

                                                      {/* Product Title and Price */}
                                                      <div className="flex flex-col">
                                                            <span>{item?.title}</span>
                                                            <PriceFormat amount={item?.price} />
                                                      </div>
                                                </Link>
                                          ))}
                                    </div>

                              ) : (
                                    <div className="py-10 px-5">
                                          <p className="text-base">
                                                Nothing matched with{" "}
                                                <span className="font-semibold underline underline-offset-2 decoration-[1px]">
                                                      {searchQuery}
                                                </span>{" "}
                                                please try again.
                                          </p>
                                    </div>
                              )}
                        </div>
                  )}
                  {/*  ============= Searchfield end here ============ */}
            </div>
      );
};

export default SearchInput;
