# What is this?
<p>This is a simple API for CRUD and Auth for a bookstore. <b>You can find all routes and their descriptions inside controllers/.</b> This project is not finished yet.</p>

# Requirements
<p>This is a nodejs and mongodb project. All you need are:</p>
<ul>
    <li>mongodb community version</li>
    <li>node.js installed in your computer</li>
    <li>npm for package manager</li>
    <li>Postman or other software to test the API</li>
</ul>

# How to setup?
<ul>
    <li><pre>git clone git@github.com:ma-ranaivoson/book-store-api.git</pre></li>
    <li><pre>cd book-store-api</pre></li>
    <li><pre>touch config/config.env</pre></li>
    <li>Configure your environment variable inside <strong>config/config.env</strong> (you can take below as example)
    </li>
    <li><pre>npm run dev</pre></li>
    <li>Test the api</li>
</ul>

# All environment variables
<ul>
    <li>PORT : to start your server</li>
    <li>MONGO_URI : mongodb URI</li>
    <li>NODE_ENV : could be <em>development</em> or <em>production</em></li>
    <li>JWT_PRIVATE_KEY : jsonwebtoken private key</li>
    <li>JWT_EXPIRES : the token expiration</li>
</ul>

# config.env example
<pre>
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/library-api
NODE_ENV=development
JWT_PRIVATE_KEY=jzherkl854
JWT_EXPIRES=10d
</pre>

