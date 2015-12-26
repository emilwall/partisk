# Partisk - The Political Party Opinion Visualizer

**Start the app**

Make sure that you have a reasonably new version of node and npm. Then install mysql and start the server, for example [on OS X](http://stackoverflow.com/questions/4788381):

```bash
brew install mysql
mysql.server start
```

Then create a database for the application, the default user credentials are 'root' and an empty password but you may have another configuration.

```bash
echo "create database partisk" | mysql -u root -p
mysql -u root -p partisk < partisk.sql
```

Once the database is up and running, just install dependencies and run the application (you may get peerinvalid error, just ignore that):

```bash
npm install
npm run dev
```

Next, edit `src/utils/APIUtils.js` with user/pass to mysql.

Open [localhost:3000](http://localhost:3000).

You can also try the built app:

```bash
npm run build   # First, build for production
npm run prod    # then, run the production version
```

then open [localhost:8080](http://localhost:8080).
