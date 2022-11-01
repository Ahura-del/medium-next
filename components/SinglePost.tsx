import Image from "next/image";
import Link from "next/link";
import avatar from "../public/assets/avatar.png";

function SinglePost({ post }: any) {
  const source =  `${process.env.NEXT_PUBLIC_API_URL}${post.attributes.postPhoto.data?.attributes.url}`;

  return (
    <Link href={`post/${post.id}`}>
      <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:cursor-pointer transition-shadow duration-200 group hover:shadow-2xl">
        <img
          src={source}
          alt="post"
          className="w-full h-48 object-cover bg-center transition-transform duration-200 group-hover:scale-105"
        />
        <div className="px-2 py-5 flex justify-between">
          <div>
            <h2 className="font-bold text-xl">{post.attributes.title}</h2>
            <p className="font-thin">{post.attributes.description}</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-sm font-medium">
              {post.attributes.createdBy.data?.attributes.username}
            </p>
            <Image src={avatar} className="mx-auto" width={50} alt="avatar" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SinglePost;
