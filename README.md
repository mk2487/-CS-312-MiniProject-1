# Blog Web Application Using Node.js, Express.js, and EJS

A responsive mini-project with post creation, viewing, editing, deletion, and category filtering. Posts include an author, creation time, title, content, and category.

## Run locally

Install Node.js, then run:

```sh
npm ci
npm start
```

Open http://localhost:3000. Hosting providers can set the `PORT` environment variable.

## Deploy from GitHub to Render

1. Upload this folder's contents to a GitHub repository, keeping `views/` and `public/` as folders.
2. Sign in to Render and create a Node web service from that repository.
3. Set build command to `npm ci`, start command to `npm start`, and health check path to `/health`.
4. Choose the Free instance type and deploy. Alternatively, create a Render Blueprint using the included `render.yaml`.

GitHub Pages cannot run this Express server.

## Temporary data

Posts live only in a server-side array. All visitors share the same posts and can edit or delete them. Closing a browser does not reset posts; restarting, redeploying, or a host stopping the server clears them. Run one server instance for this mini-project.

## Manual demonstration

Create posts in different categories, filter the list, edit a post and verify its replacement, then delete it. Check the layout at desktop and mobile widths.
