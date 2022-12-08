import { categories, PostType } from "lib/data";

interface BlogProps {
  blogData: PostType;
}

const Blog = ({ blogData }: BlogProps) => {
  return (
    <div className="w-80 min-h-max bg-white rounded-lg drop-shadow-md overflow-hidden hover:-translate-y-4 transition delay-150 duration-300 ease-in-out">
      <img
        alt="Image doesn't exist"
        src={blogData.imageUrl}
        className="h-36 w-full object-cover"
      />
      <div className="p-6">
        <div className="flex gap-2">
          {blogData.categories.map((category: number, index: number) => {
            return (
              <span className="text-yellow-400" key={index}>
                {categories.find((el) => el.id === category)?.name}
              </span>
            );
          })}
        </div>
        <h2 className="font-semibold">{blogData.title}</h2>
        <p className="mt-4">{blogData.excerpt}</p>
      </div>
    </div>
  );
};

export default Blog;
