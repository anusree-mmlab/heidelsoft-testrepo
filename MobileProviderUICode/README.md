
 
#Instructions to run the code

1. It is done using React, Redux, Material UI stack.

2. In the terminal 
 npm install
 npm start
this will start the project in port 4000

3. There is a /build folder in the source code - which you can host on a server and can see the same output.

4. The screenshots are provided 

1.  Home screen - user can type a phone number and choose a provider.
By default 2 providers are added 111 and 222 are supported prefix for them

2. You can add more prefixes using the url http://localhost:4000/admin, where a simple email based login is added

3.  In the /admin , user can see all the prefix + rate and can add and delete a prefix.

4. Right now no api or persistent storage is used - so data will be lost with refresh and new tab.
So while testing you can take /admin and home screen in the same tab using the navigation links provided in the navigation bar.
Can add new prefix and can test it in the homescreen.

5. The default test suit is available and can be run using 
npm run-script test

If you have any concerns while executing it, please contact me.

Anusree
