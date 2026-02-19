import React, { useState } from "react";
import { filterOptions } from "../../constants/filterOptions";
import { Minus, Plus } from "lucide-react";

import { filterComponent } from "../../constants/filterOptions";

const FilterSidebar = () => {
  const [activeFilter, setActiveFilter] = useState();
  const [listOpens, setListOpens] = useState([]);

  const handleOpenFilter = (id) => {
    setActiveFilter(id);
    if (listOpens.includes(id)) {
      setListOpens(listOpens.filter((item) => item != id));
    } else {
      setListOpens([...listOpens, id]);
    }
  };

  const ActiveComponent = filterComponent[activeFilter];
  return (
    <div className="flex flex-col gap-[10px] ">
      {filterOptions.map((item) => {
        const isOpen = listOpens.includes(item.id);
        return (
          <div>
            <div
              onClick={() => handleOpenFilter(item.id)}
              className="flex justify-between items-center py-[15px] cursor-pointer border-b-[1px] border-gray-500"
            >
              <p className="text-[#393280] font-semibold">{item.lable}</p>
              {isOpen && item.id == activeFilter ? (
                <Minus size={18} />
              ) : (
                <Plus size={18} />
              )}
            </div>

            {item.id == activeFilter && isOpen ? <ActiveComponent /> : null}
          </div>
        );
      })}
    </div>
  );
};

export default FilterSidebar;
