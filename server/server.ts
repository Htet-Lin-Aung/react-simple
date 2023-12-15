import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const secret = "my-very-secure-secret";

const users = [
  {
    id: 1,
    username: "Test",
    email: "test@gmail.com",
    password: "test",
  },
];

const blogs = [
  {
    id: 1,
    title: "Sample Blog",
    content: "This is a sample blog post.",
    authorId: 1,
  },
];

const VerifyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user: any) => {
      if (err) {
        res.status(401).json({
          meta: {
            status: false,
            message: "Unauthorized",
          },
        });
      }
      req.params.userId = user.id;
      next();
    });
  } else {
    res.status(401).json({
      meta: {
        status: false,
        message: "Unauthorized",
      },
    });
  }
};

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    meta: {
      status: true,
      message: "Hello World",
    },
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.filter((user) => user.email === email);

  if (existingUser.length > 0 && existingUser[0].password === password) {
    const token = jwt.sign(
      {
        id: existingUser[0].id,
      },
      secret,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      meta: {
        status: true,
        message: "Authorized",
      },
      body: {
        token,
      },
    });
  } else {
    res.status(401).json({
      meta: {
        status: false,
        message: "Unauthorized",
      },
    });
  }
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    // Check if email exists
    if (users.some((user) => user.email === email)) {
      return res.status(403).json({
        meta: {
          status: false,
          message: "Email already exists",
        },
      });
    } else {
      // Create and add new user
      const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
      };
      users.push(newUser);
      return res.status(201).json({
        meta: {
          status: true,
          message: `Welcome ${username}, you can log in now.`,
        },
      });
    }
  } else {
    return res.status(400).json({
      meta: {
        status: false,
        message: "Required fields are missing",
      },
    });
  }
});

app.get("/whoami", VerifyAuth, (req, res) => {
	const userId = req.params.userId;
	const existingUser = users.filter(
		(user) => user.id.toString() === userId.toString()
	);
	if (existingUser.length > 0) {
		res.status(200).json({
			meta: {
				status: true,
				message: "Welcome",
			},
			body: existingUser[0],
		});
	} else {
		res.status(404).json({
			meta: {
				status: false,
				message: "User Not Found",
			},
		});
	}
});

app.get("/blogs", VerifyAuth, (req, res) => {
  const userId = Number(req.params.userId);

  // Filter blogs based on authorId
  const userBlogs = blogs.filter((blog) => blog.authorId === Number(userId));
  res.status(200).json({
    meta: {
      status: true,
      message: "List of blogs",
    },
    body: userBlogs,
  });
});

app.post("/blogs", VerifyAuth, (req, res) => {
  const { title, content } = req.body;
  const authorId = Number(req.params.userId); // Convert to number

  if (title && content) {
    const newBlog = {
      id: blogs.length + 1,
      title,
      content,
      authorId,
    };
    blogs.push(newBlog);
    res.status(201).json({
      meta: {
        status: true,
        message: "Blog created successfully",
      },
      body: newBlog,
    });
  } else {
    res.status(403).json({
      meta: {
        status: false,
        message: "Title and content are required",
      },
    });
  }
});

// Update a blog
app.put("/blogs/:id", VerifyAuth, (req, res) => {
  const blogId = Number(req.params.id);
  const { title, content } = req.body;

  const existingBlogIndex = blogs.findIndex((blog) => blog.id === blogId);

  if (existingBlogIndex !== -1) {
    const updatedBlog = {
      ...blogs[existingBlogIndex],
      title: title || blogs[existingBlogIndex].title,
      content: content || blogs[existingBlogIndex].content,
    };

    blogs[existingBlogIndex] = updatedBlog;

    res.status(200).json({
      meta: {
        status: true,
        message: "Blog updated successfully",
      },
      body: updatedBlog,
    });
  } else {
    res.status(404).json({
      meta: {
        status: false,
        message: "Blog not found",
      },
    });
  }
});

// Delete a blog
app.delete("/blogs/:id", VerifyAuth, (req, res) => {
  const blogId = Number(req.params.id);

  const existingBlogIndex = blogs.findIndex((blog) => blog.id === blogId);

  if (existingBlogIndex !== -1) {
    const deletedBlog = blogs.splice(existingBlogIndex, 1)[0];

    res.status(200).json({
      meta: {
        status: true,
        message: "Blog deleted successfully",
      },
      body: deletedBlog,
    });
  } else {
    res.status(404).json({
      meta: {
        status: false,
        message: "Blog not found",
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
