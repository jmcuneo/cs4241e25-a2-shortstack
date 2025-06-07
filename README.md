Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

This assignment aims to introduce you to creating a prototype two-tiered web application. 
Your application will include the use of HTML, CSS, JavaScript, and Node.js functionality, with active communication between the client and the server over the life of a user session.

Baseline Requirements
---

There is a large range of application areas and possibilities that meet these baseline requirements. 
Try to make your application do something useful! A todo list, storing / retrieving high scores for a very simple game... have a little fun with it.

Your application is required to implement the following functionalities (4 pts each, total 20 pts):

- a `Server` which not only serves files, but also maintains a tabular dataset with 3 or more fields related to your application
- a `Results` functionality which shows the entire dataset residing in the server's memory
- a `Form/Entry` functionality which allows a user to add or delete data items residing in the server's memory
- a `Server Logic` which, upon receiving new or modified "incoming" data, includes and uses a function that adds at least one additional derived field to this incoming data before integrating it with the existing dataset
- the `Derived field` for a new row of data must be computed based on fields already existing in the row. 
For example, a `todo` dataset with `task`, `priority`, and `creation_date` may generate a new field `deadline` by looking at `creation_date` and `priority`

Your application is required to demonstrate the use of the following concepts:

HTML (4 pts each, total 16 pts):
- One or more [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms), with any combination of form tags appropriate for the user input portion of the application
- A results page displaying all data currently available on the server. You will most likely use a `<table>` tag for this, but `<ul>` or `<ol>` could also work and might be simpler to work with. Alternatively, you can create a single-page app (see Technical Acheivements) but this is not a requirement.
- All pages should [validate](https://validator.w3.org)
- If your app contains multple pages, they should all be accessible from the homepage (index.html)

CSS (4 pts each, total 16 pts):
- CSS styling of the primary visual elements in the application
- Various CSS Selector functionality must be demonstrated:
    - Element selectors
    - ID selectors
    - Class selectors
- CSS positioning and styling of the primary visual elements in the application:
    - Use of either a CSS grid or flexbox for layout
    - Rules defining fonts for all text used; no default fonts! Be sure to use a web safe font or a font from a web service like [Google Fonts](http://fonts.google.com/)
- CSS defined in a maintainable, readable form, in external stylesheets 

JavaScript (4 pts):
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server; a sample is provided in this repository.

Node.js (4 pts):
- An HTTP Server that delivers all necessary files and data for the application, and also creates the required `Derived Fields` in your data. 
A starting point is provided in this repository.

Deliverables
---

1. (5 pts) Fork the starting project code repo. The starter code in the repo may be used or discarded as needed.
2. (60 pts, detailed above) Implement your project with the above requirements.
3. Test your project to make sure that when someone goes to your main page, it displays correctly.
4. (5 pts) Deploy your project to Glitch, and fill in the appropriate fields in your package.json file.
5. (5 pts) Ensure that your project has the proper naming scheme `a2-FirstnameLastname` so we can find it.
6. (5 pts) Modify the README to the specifications below, and delete all of the instructions originally found in this README.
7. (5 pts) Create and submit a Pull Request to the original repo. Be sure to include your name in the pull request.

Acheivements
---

Below are suggested technical and design achievements. You can use these to help customize the assignment to your personal interests. These are recommended acheivements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README and why it was challenging. ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM. Remember, the highest grade you can get on any individual assignment is a 100%.

*Technical*
- (5 points) Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. To put it another way, when the user submits data, the server should respond sending back the updated data (including the derived field calculated on the server) and the client should then update its data display.

- (5 points) In addition to a form enabling adding and deleting data on the server, also add the ability to modify existing data.

*Design/UX*
- (5 points per person, with a max of 10 points) Test your user interface with other students in the class. Define a specific task for them to complete (ideally something short that takes <10 minutes), and then use the [think-aloud protocol](https://en.wikipedia.org/wiki/Think_aloud_protocol) to obtain feedback on your design (talk-aloud is also fine). Important considerations when designing your study:

1. Make sure you start the study by clearly stating the task that you expect your user to accomplish.
2. You shouldn't provide any verbal instructions on how to use your interface / accomplish the task you give them. Make sure that your interface is clear enough that users can figure it out without any instruction, or provide text instructions from within the interface itself. 
3. If users get stuck to the point where they give up, you can then provde instruction so that the study can continue, but make sure to discuss this in your README. You won't lose any points for this... all feedback is good feedback!

You'll need to use sometype of collaborative software that will enable you both to see the test subject's screen and listen to their voice as they describe their thoughts, or conduct the studies in person. After completing each study, briefly (one to two sentences for each question) address the following in your README:

1. Provide the last name of each student you conduct the evaluation with.
2. What problems did the user have with your design?
3. What comments did they make that surprised you?
4. What would you change about the interface based on their feedback?

*You do not need to actually make changes based on their feedback*. This acheivement is designed to help gain experience testing user interfaces. If you run two user studies, you should answer two sets of questions. 

FAQ
---
**Q: Can I use frameworks for this assignment?**

A: No. We'll discuss them later this term, but for right now, we want to see that you can implement these features yourself instead of outsourcing them to an existing framework or library.

**Q: After I delete some data server-side, the data persists on the client side until I refresh the page.**

A: Make sure the client-side copy of the data also reflects the deletion. The server-side and client-side copies of the data should remain in sync at all times.

**Q: Do I have to implement the specific achievements above?**

A: No. As discussed in the instructions, you are free to implement your own. If you're not sure if they'll qualify, check with the instructor.

**Q: If I do a single page for the technical achievement, will I still get credit for the last two criteria in the base requirements?**

Yes.


Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Spending Tracker
Esther Kim
http://a2-estherkim.glitch.me

Include a very brief summary of your project here. Be sure to include the CSS positioning technique you used, and any required instructions to use your application.

This project is a simple spending tracker. You can add items to the list with additional information, including the name of the item, the price it was bought at, any discounts that the item had, the category of the item, and any side notes. The date and money saved will automatically be calculated and added. You can also delete items from the list.

## Technical Achievements
- **index.html**: The first page, index.html, has a form for users to pass in information to the server, including item name, price paid, discount, category of item, and notes. There is also a navigation bar that leads to the page that displays all the data, spending-list.html.
    - I used a dropdown menu for the category and regular text fields for the rest. Only the category and discount have autofilled responses. When the button is pressed, main.js sends all the user input to the server as a list of key value pairs.
    - Then the server will call the handlePost function, which will add the list it receives into an array it uses to hold all the data. The server will send a response back to the client.
    - When the client receives a response, it will check the status code. If the status code is okay, then it will give an alert that the item was successfully added. If not, then the client will give an alert saying there was an error. After, the page is refreshed, clearing the input boxes.
    - It took time to figure out how the client communicated with the server and how I can get the client and server to send the information I would like them to share. I also had to fiddle around with index.html and main.js to figure out how the html connected with the javascript so that once the button on the form was pressed, the client side javascript would send a request to the server.
- **spending-list.html**: This is the results page, which displays all the data that is stored in the server, including the derived columns. The information is displayed as a table with the most recently added items at the top. There is a button next to each item to delete it. There is also a navigation bar that leads back to the main page to add more items, index.html.
    - The table header is hard coded in the html file, but the rows of the table is populated using main.js. Within the table body, I call the populateTable function to fill in the table using the data stored in the server.
    - Once the function is called, main.js fetches obtainData.json, which is handled by the handleGet function in the server.improved.js.
    - The server sends back the information by using stringify on the array of data and identifying the content type in the response as json.
    - main.js receives the data and then adds a row for each key value pair list in the array and individually adds each cell to the row in order. With each item, a button is added to the end of the row for deleting. When the delete button is pressed, the item id is passed to the server. Then the server uses the item id to find the index of that element in the array and then splice it out.
- **server.improved.js**: The server handles GET, POST, and DELETE requests. When adding in new items to the array, the current date is calculated and formatted using the getDate function, and the amount of money saved is calculated using the price paid and discount data received from the user. You can also delete items from the list.

### Design/Evaluation Achievements
- **class vs. id**: Depending on the class and id, I styled them differently. For the class, I grouped all the delete buttons together under the class "deleteButton" and colored the text red to highlight that it would delete the item. For the id, I styled the other submit button for the form, adding padding.
- **form**: I added padding to make the boxes of the input and select boxes bigger, and I added margins to add more space between the boxes and the edge of the screen. I tried experimenting with the flexbox by making this a flexbox so that I could align the items within the form. I set the flex-direction to column so that the input boxes would be under the text labels.
-**nav**: For the navigation bar, I set the position to sticky so that it would stay at the top of the screen no matter where you scrolled.
-**table**: I centered everything in the table and I collapsed the border of the table so that there would only be one line.
