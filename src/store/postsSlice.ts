import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  skip: number;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  skip: 0,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (skip: number = 0, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/posts?limit=10&skip=${skip}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PostsResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch posts",
      );
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostsResponse>) => {
          state.loading = false;
          state.posts = [...state.posts, ...action.payload.posts];
          state.skip = action.payload.skip + action.payload.limit;
          state.hasMore = state.posts.length < action.payload.total;
        },
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export default postsSlice.reducer;
