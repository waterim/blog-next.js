import Head from "next/head";
import { Blog, FilterSection } from "components";
import { GetServerSideProps } from "next";
import absoluteUrl from "next-absolute-url";
import { PostType } from "lib/data";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

interface BlogPageProps {
  data: {
    currentPage: number;
    pageCount: number;
    posts: PostType[];
  };
}

type PageType = {
  selected: number;
};

export default function Home({ data }: BlogPageProps) {
  const router = useRouter();

  const pagginationHandler = (page: PageType) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.selected ? (page.selected + 1).toString() : "1";

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const filterByCategoryHandler = (value: string) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    value === "Not selected"
      ? delete currentQuery.filterBy
      : (currentQuery.filterBy = value.toString());

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const searchByCategoryHandler = (value: string) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    value === ""
      ? delete currentQuery.searchBy
      : (currentQuery.searchBy = value.toString());

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <div>
      <Head>
        <title>Blogs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="my-24 max-w-screen-xl flex flex-col gap-12 items-center ">
        <h1 className="text-center text-2xl font-semibold">Blogs page</h1>
        <FilterSection
          filterAction={filterByCategoryHandler}
          searchAction={searchByCategoryHandler}
        />
        <div className="flex gap-6 flex-wrap justify-center">
          {data.posts.map((post: PostType) => {
            return <Blog key={post.id} blogData={post} />;
          })}
        </div>

        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          containerClassName="flex gap-2 items-center"
          pageClassName="px-4 py-2"
          activeClassName="bg-yellow-400 text-white rounded-lg"
          initialPage={data.currentPage - 1}
          pageCount={data.pageCount}
          onPageChange={pagginationHandler}
          renderOnZeroPageCount={() => null}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;
  const { origin } = absoluteUrl(req, req.headers.host);
  const pageQueryPath = `?page=${query.page}`;
  const filterQueryPath = query.filterBy ? `&filterBy=${query.filterBy}` : ``;
  const searchQueryPath = query.searchBy ? `&searchBy=${query.searchBy}` : ``;
  const queryPath = pageQueryPath.concat(filterQueryPath, searchQueryPath);
  const res = await fetch(`${origin}/api/posts${queryPath}`);
  const data = await res.json();
  return {
    props: { data },
  };
};
