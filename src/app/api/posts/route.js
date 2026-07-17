import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  try {
    await connect();

    const posts = username
      ? await Post.find({ username })
      : await Post.find();

    return NextResponse.json({ posts }, { status: 200 });

  } catch (err) {
    console.error("GET /api/posts Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    await connect();

    const body = await request.json();

    const newPost = new Post(body);
    await newPost.save();

    return NextResponse.json(
      {
        success: true,
        message: "Post has been created",
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("POST /api/posts Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
};