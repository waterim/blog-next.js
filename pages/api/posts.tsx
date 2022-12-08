import type { NextApiRequest, NextApiResponse } from "next";
import { posts, categories } from "lib/data";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const allPosts = [...posts];
  const { filterBy, page, searchBy } = req.query;

  const filteredPosts = filterBy
    ? allPosts.filter((post) =>
        post.categories.some((category) =>
          categories.find((el) => el.id === category && el.slug === filterBy)
        )
      )
    : allPosts;

  const searchPosts = searchBy
    ? filteredPosts.filter((post) => {
        if (typeof searchBy === "string") {
          return post.title.toLowerCase().includes(searchBy.toLowerCase());
        }
      })
    : filteredPosts;

  const totalPostsLength = searchPosts.length;
  const currentPage = searchBy ? 1 : page || 1;
  const perPage = 6;
  const totalPages = Math.ceil(totalPostsLength / perPage);
  const start = (Number(currentPage) - 1) * perPage;
  let end = start + perPage;
  if (end > totalPostsLength) {
    end = totalPostsLength;
  }
  const postsToSend = searchPosts.slice(start, end);

  res.status(200).json({
    currentPage: currentPage,
    pageCount: totalPages,
    posts: postsToSend,
  });
}
