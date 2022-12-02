import { Sign } from "crypto";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import SinglePost from "../components/SinglePost";
import {  getPosts } from "../lib/fetch";
import medium from "../public/assets/medium.png";
export const getStaticProps: GetStaticProps<{ posts: any  }> = async (
  context
) => {
  const posts = await getPosts();
  return {
    props: {
      posts,
      
    },
    revalidate:60
  };
};

function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
     
      <div className="flex items-center justify-between max-w-7xl mx-auto bg-yellow-400 px-10 py-10 md:py-0 border-b-2 border-gray-500">
        <div>
          <h1 className="text-5xl font-serif pb-5 max-w-md">
            <span className="underline">Medium</span> is a place to write, read,
            and connect.
          </h1>
          <p className="font-light">
            It is easy and free to post your thinking on any topic and connect
            with millions of readers.
          </p>
        </div>
        <div className="hidden md:block">
          <Image src={medium} alt="medium" width={500} height={500} />
        </div>
      </div>
      <div className="py-5 mx-5 max-w-7xl lg:mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.data?.map((post: any) => (
          <SinglePost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
