# millie-school-recommender
## Website for Millie's School Recommender Tool

At the time the data in the "Browse" page is retreived from the "mini_master.csv" file in this folder. Eventually I hope this turns into an automated process, where the csv/json is uploaded to AWS and retreived from there. 


## Current iteration includes:
* Home page: contains filters to apply to the school search.
* Browse page: 
    * Displays all schools from the database in a table
    * Table rows may depending on the user's choice in the main page filters. 
    * Includes a search bar to search through the database and return all rows that contain the searched keyword.
    * A statistics bar that shows a summary of the current rows in the table.
* School details page: once the user clicks on a row that represenst a specific school in the Browse page, they will be redirected to a page with more details about that school. The page includes general info, contact info, and hyperlinks to any social media links associated with school.

## Notes:
### Adding new filters in the main page
* In the array `searchFilters` in `Home.js` add the name of field you want to add as a filter. Note that the field name must match the one in the *master* table. Also, at the moment the code only supports fields that are in the *master* table.
### Adding new fields in the school details page
* In the school details page, if you want to add a new field to be viewed in the boxes, you must add the field title (just like it is in the database table) to an array in the SchoolDetails.js file. Currently existing arrays are 'generalFields' and 'contactFields'.
### The Browse page search bar
* At the moment all rows in the DB are being searched by checking if the search query exists in specific fields. At the moment these fields must be adjusted manually by modifying 'searchableFields' in the server file. They can just be added based on their name in 'master' DB.

## Wish to have and optimization adjustments:
* Set a few columns to be the default view of the table in "Browse" instead of having all of them. The defualts will be viewed, and the user can add the other column to them manually from the buttons provided.
* Statistics will be calculated whenever the rows are updated. Currently this will happen on the front end, but ideally this might be handled by the backend, where the row info will be sent to another server and get back the statistics.
* Only perform the search in the Browse tab after the serach button is pressed. This will likely decrease the lagging happening.
* Currently, merging between mini_master and data_b happens through the common website. Ideally they would be linked through millie code. Once data_b is updated to contain millie code, a quick change can be made to modify the code. Search for 'change_connection_from_website_to_millie_code' in Browser.js, and change the third parameter in mergeObjectArrays from 'Website' to 'Millie Code'. NOTE: the spelling of 'Millie Code' must be the exact same spelling as the field name in both files you want to link between, it is also case-sensitive. 

## Running the code on your machine:
0. First time runs require `npm install` to be run both in the root directory and the client folder.
1. In the root directory run `npm run dev` to run the server (backend). The server will run at `http://localhost:3001/`.
2. In the client directory run `npm run start` to run the client (frontend). The website will run at `http://localhost:3000/`.
