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
