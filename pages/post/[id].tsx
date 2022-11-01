import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { getComment, getPost, getPosts } from "../../lib/fetch";
import avatar from "../../public/assets/avatar.png";
import ReactMarkdown from "react-markdown";
import Comment from "../../components/Comment";
import SingleComment from "../../components/SingleComment";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return {
    paths: posts?.data?.map((post: any) => ({
      params: { id: post.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { id },
}: any) => {
  const post = await getPost(id);
  const comments = await getComment();
  return {
    props: {
      post,
      comments,
    },
    revalidate: 60,
  };
};

function Post({ post, comments }: any) {
  const source = `${process.env.NEXT_PUBLIC_API_URL}${post.data.attributes.postPhoto.data?.attributes.url}`;
  const date = new Date(post.data.attributes.createdAt);
  console.log(comments);
  return (
    <div>
      <img
        src={source}
        alt="post cover"
        className="w-full h-52 object-cover bg-center"
      />

      <div className="max-w-3xl mx-auto p-10 ">
        <h1 className="text-3xl font-medium mb-2">
          {post.data.attributes.title}
        </h1>
        <p className="mb-8 text-gray-500">{post.data.attributes.description}</p>

        <div className="flex items-center gap-3">
          <Image src={avatar} width={50} height={50} alt="avatar" />
          <div>
            <p className="text-sm">
              Created by{" "}
              <span className="font-medium">
                {post.data.attributes.createdBy.data.attributes.username}
              </span>
            </p>
            <p className="text-sm font-thin">
              Created at {date.toLocaleDateString()}
            </p>
          </div>
        </div>
        <hr className="my-10" />
        <div>
          <ReactMarkdown
            children={post.data.attributes.paragraph}
            className="text-justify"
            components={{
              h3: ({ node, ...props }) => (
                <h3 className="text-3xl py-5" {...props} />
              ),
              img: ({ node, ...props }) => <img className="my-8" {...props} />,
            }}
          />
        </div>
        <hr className="my-10" />
        <div>
          <div className="my-10">
            <h4 className=" text-yellow-600 text-2xl font-medium text-center ">
              Your Comments
            </h4>

            {comments?.data.length > 0 ? (
              <div className="mb-10 mt-5">
                {comments?.data.map((comment: any) => (
                  <SingleComment key={comment.id} comment={comment} />
                ))}
              </div>
            ) : (
              <p className="text-center text-sm mt-4 text-yellow-400">
                No comment!
              </p>
            )}
          </div>

          <hr className="my-10" />

          <h4 className="mb-10 text-3xl font-bold">Write a comment!</h4>
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default Post;
