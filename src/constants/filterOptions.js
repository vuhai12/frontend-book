import CategoriesFilter from "../components/FilterSidebar/components/CategoriesFilter";
import PricesFilter from "../components/FilterSidebar/components/PricesFilter";

export const filterOptions = [
  // {
  //   id: "prices",
  //   lable: "Prices",
  // },
  {
    id: "categories",
    lable: "Categories",
  },
];

export const filterComponent = {
  prices: PricesFilter,
  categories: CategoriesFilter,
};
