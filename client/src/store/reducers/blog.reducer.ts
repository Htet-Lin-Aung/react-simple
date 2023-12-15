import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBlog {
  id: number;
  title: string;
  content: string;
}

interface IBlogState {
  blogs: IBlog[];
  selectedBlog: IBlog | null;
  isEditing: boolean;
}

const initialState: IBlogState = {
  blogs: [],
  selectedBlog: null,
  isEditing: false,
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<IBlog[]>) => {
      state.blogs = action.payload;
    },
    setSelectedBlog: (state, action: PayloadAction<IBlog | null>) => {
      state.selectedBlog = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    addBlog: (state, action: PayloadAction<IBlog>) => {
      state.blogs.push(action.payload);
    },
    updateBlog: (state, action: PayloadAction<IBlog>) => {
      if (state.selectedBlog) {
        state.blogs = state.blogs.map((blog) =>
            blog.id === state.selectedBlog?.id ? { ...blog, ...action.payload } : blog
        );
        state.selectedBlog = null;
        state.isEditing = false;
      }
    },
    deleteBlog: (state, action: PayloadAction<number>) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, setSelectedBlog, setIsEditing, addBlog, updateBlog, deleteBlog } = blogSlice.actions;

export default blogSlice.reducer;
