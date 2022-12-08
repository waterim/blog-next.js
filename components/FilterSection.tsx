import { categories } from "lib/data";
import { useRouter } from "next/router";

interface FilterSectionProps {
  filterAction: (e: string) => void;
  searchAction: (e: string) => void;
}

const FilterSection = ({ filterAction, searchAction }: FilterSectionProps) => {
  const router = useRouter();
  const currentQuery = router.query;
  return (
    <div className="bg-white px-8 py-4 flex items-center drop-shadow-md rounded-lg max-[500px]:flex-col">
      <input
        className="text-xl px-4 py-2 outline-none border-b-[0.8px] border-yellow-400"
        placeholder="Search..."
        defaultValue={currentQuery.searchBy || ""}
        onChange={(e) => searchAction(e.target.value)}
      />
      <select
        className="text-xl bg-transparent px-4 py-2 outline-none flex justify-center w-full"
        name="categories"
        defaultValue={currentQuery.filterBy || ""}
        onChange={(e) => filterAction(e.currentTarget.value)}
      >
        <option>Not selected</option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSection;
