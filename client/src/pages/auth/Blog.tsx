import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setBlogs, 
    setSelectedBlog, 
    setIsEditing, 
    addBlog, 
    updateBlog, 
    deleteBlog 
} from '../../store/reducers/blog.reducer';
import { getBlogs, 
    createBlog as createBlogApi, 
    updateBlog as updateBlogApi, 
    deleteBlog as deleteBlogApi, 
    IBlog
} from '../../api/blog';
import Input from '../../components/Input'; 
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Textarea from '../../components/Textarea';

const validationSchema = Yup.object({
	title: Yup.string()
	.required("Title is required"),
	content: Yup.string()
	.required("Password is required"),
});

interface IBlogForm {
  title: string;
  content: string;
}

const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: any) => state.blog?.blogs || []);
  const selectedBlog = useSelector((state: any) => state.blog?.selectedBlog || null);
  const isEditing = useSelector((state: any) => state.blog?.isEditing || false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
    setValue
  } = useForm<IBlogForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const token = localStorage.getItem('token')??'';

  useEffect(() => {
    // Fetch blogs on component mount
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Set values when editing
    if (selectedBlog) {
      setValue('title', selectedBlog.title);
      setValue('content', selectedBlog.content);
    }
  }, [selectedBlog, setValue]);

  const fetchBlogs = async () => {
    const { body: blogsData } = await getBlogs(token);
    dispatch(setBlogs(blogsData));
  };  
  
  const handleAddBlog = async (data: IBlogForm) => {
    const newBlog = await createBlogApi(data,token);
    dispatch(addBlog(newBlog));
    reset();
    // Fetch blogs after adding a new blog
    fetchBlogs();
  };

  const handleEditBlog = (blog: IBlog) => {
    dispatch(setSelectedBlog(blog));
    dispatch(setIsEditing(true));
  };

  const handleUpdateBlog = async (data: IBlogForm) => {
    if (selectedBlog) {
      const updatedBlog = await updateBlogApi(selectedBlog.id, data,token);
      dispatch(updateBlog(updatedBlog));
      reset();
      dispatch(setSelectedBlog(null));
      dispatch(setIsEditing(false));
      // Fetch blogs after updating a new blog
      fetchBlogs();
    }
  };

  const handleDeleteBlog = async (id: number) => {
    await deleteBlogApi(id,token);
    dispatch(deleteBlog(id));
  };

  return (
    <>
        <div className="w-screen flex items-center justify-center p-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">Blog CRUD</h3>
            <form onSubmit={isEditing ? handleSubmit(handleUpdateBlog) : handleSubmit(handleAddBlog)}>
                <div className="w-full flex flex-col mb-4">
                    <label>Title</label>
                    <Input
                    placeholder="Enter your title"
                    name="title"
                    control={control}
                    errors={errors}
                    isValid={isValid}
                    />
                </div>

                <div className="w-full flex flex-col mb-4">
                    <label>Content</label>
                    <Textarea
                    placeholder="Enter your content"
                    name="content"
                    control={control}
                    errors={errors}
                    isValid={isValid}
                    />
                </div>
                <div className='text-center'>
                <button type="submit" >{isEditing ? 'Update' : 'Add'} Blog</button>
                </div>
            </form>
            </div>
        </div>
        <div className='flex m-10'>
          <ul className="w-screen border border-gray-700 rounded-md p-4 space-y-4">
            {blogs.length === 0 ? (
              <li className="text-gray-600">No blogs available.</li>
            ) : (
              blogs.map((blog: IBlog) => (
                <li key={blog.id} className="bg-white p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <strong className="text-xl">{blog.title}</strong>
                    <p className="text-gray-600">{blog.content}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
    </>
  );
};

export default Blog;
