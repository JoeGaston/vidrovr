# Please do the following steps to run the program yourself after running "npm install"

    1. Create a .env file
    2. Add a variable called API_KEY = your api key goes here
    3. Start the server with "npm run dev"
    4. Run the program at http://localhost:4000/batch-data to see the data returned from Vidrovr API
    5. To view the map, simply open the index.html file in a browser


# Below is how I approached solving this problem. 

First, I created an intelligence scenario where reports had mentioned that China has assembled and shipped an integrated air defense system (IADS) somewhere in the philippines. The containers are assessed to have already arrived at their destinations and they only indicators are they are marked with the spanish port construction company - "DRAGADOS". There are currently no DRAGADOS operations in the philippines and any container with these markers should be treated as a possible threat.

    1. Tested images / video to understand VidRovr's tech/capabilities
    2. Decided that text based metadata was the easiest to create and control with nearly 100% accuracy from the program. 
    3. Created 12 images from port CCTV cameras around the philippines of containers and ships, 3 of which were labeled "DRAGADOS"
    4. Used the API call to get OCR data from an asset ID (called all 12 at the same time)
    5. Ensured I grabbed the TextValue from the API object
    6. Used a conditional to identify the  objects with a textValue === DRAGADOS && had coordinates
    7. ONLY objects that met the above conditions were pushed into GeoJSON format
    8. Created a map and a view reference using ESRIs documentation 
    9. Created an active layer that can receive the geoJSON file
    10. If everything above, you should have red dots on the map representing the above mentioned intelligene indicator - DRAGADOS


# Things I would probably change. 
    1. Will learn how to do this in python
    2. Instead of going to my library and copy/pasting the asset IDs and hardcoding them in my program, I would leverage a seperate API either using saved searches or something else...
    3. I HAD to hardcode the data. I know right now we dont geolocate things. As the program develops I think it would be valuable to be able to do this with the easiest collection types (static terrestrial video/image systems. ESPECIALLY if that data is provided in that system's meta data.)
    4. IF this was a product of its own that simply searched OCR data in Vidrovr and served no other purporse I would add a form on the front end and a post request in the routing that allows the user to change the text being searched for...

# Things I learned:
    1. I love this process/problem set
    2. Never put an API key in a smart, text-based document...it capitalizes the first letter as if its a word then the key fails
    3. Got to scrape the surface of multi-modal meta data terms? (OCR, IAB ect.)
    4. GEOJSON structure
    
