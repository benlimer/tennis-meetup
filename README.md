# [Tennis Meetup](https://github.com/benlimer/tennis-meetup)

*A web-site that helps tennis players connect with other tennis players locally and find nearby courts.*
![Screen Shot 2022-03-21 at 3 48 42 PM](https://user-images.githubusercontent.com/41413114/159352397-f30cca2f-e5f3-415c-8a81-b86a2fe0923f.png)


### Instructions for use

Default Accounts to use:
- ID: d@d.com PW: password
- ID: n@n.com PW: password

From main landing page:
- When a user clicks on "Find Players", a user will be brought to a page with a list of other players, sorted by distance. 
  - User now can click "Add Friend" to add the player as friend.
  - Once they are friends, User can click "Send Message" to send a private message. 
   - If it's the first time sending the message to that friend, a text box will appear where user can enter their message. Upon clicking "send", user will be brought to the messenger page with the message recipient on the left column and clicking on the recipient name will open up the conversation.
   - If it's not the first time, user will be brought to messenger page right away.
- When a user clicks on "Find Courts", a user will be brought to a page with a map with the nearby tennis courts marked with pins. 
  - Hovering over each pin will bring up a info-box, which contains the picture associated with the court, name, rating, and a link to google map directions. 
  - User can search different areas for courts by entering a new zipcode and designating radius of search.

On Top navigation bar:
- User can click on "messages" to go directly to the messenger tab.
- User can click on "profile" to see user's own profile page.

### How to best use live chat feature
 - To test the live chat feature, you must have two different browsers open, each signed in with a different account. 
  - i.e. One browser will be chrome with "d@d.com" as user and the other browser will be safari with "n@n.com" as the user
  - If you don't have safari, you can also just open up a incognito chrome browser as your second browser.
  - Also work with any number of browsers, each will be assigned a different user socket ID. 

### To-Do
Some ideas I have for future development:
- The listing of players will have number of matches/ skill rating next to their name, so that a user has better idea who they are playing with. 

- After a meetup, they can decide to post match results if a match was played. (have a button to create match results on the partner's showpage) (dream: - posting a match result will send the other player for approval)
- The app has added functionalities to leave reviews on courts. 
- Each user can vote on the reviews of the courts. 

The app is still a work in progress. I am more than happy to hear any suggestions that you might have to improve the app. Feel free to shoot me an email at thlim940913@gmail.com



Please feel free to clone the repo to use, you would need api-keys for:
- Google Maps API
- AWS/S3

