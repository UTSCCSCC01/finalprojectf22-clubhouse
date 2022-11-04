# Sprint 3 Planning Meeting
We had our Sprint 3 planning meeting on the October 24th where we discussed which user stories need to be accomplished for Sprint 3. Another goal of the meeting was to distribute the tasks among the team members. All of us participated in the meeting. After having chosen the user stories that we decided to complete for this sprint, we have evaluated the user stories using planning poker. 

## Sprint Goals
Finish User stories MIN-27, MIN-24, MIN-17, MIN-29, MIN-15, MIN-21, MIN-16

## Current sprint velocity
74

## User stories and subtasks
1. **MIN-15:** 
- Priority: medium
- Point estimation: 13
- Criteria of satisfaction: 
    - Club admins can submit a request to form a new club once they register
    - Club admins can fill out a form detailing their club name, club description, club tags, etc.
- Subtasks: 
    - Create page UI for club registration request form
    - Store registration request in database
    - Validate form info
    - Create confirmation page after form is successfully submitted

2. **MIN-27:**
- Priority: low
- Point estimation: 9
- Criteria of satisfaction: 
    - System admin should be able to log in
    - User should be redirected after logging in
 - Subtasks:  
    - Updated cookie storage
    - Redirect admin based off accountType
    - Update UI

3. **MIN-26:** 
- Priority: low
- Point estimation: 5
- Criteria of satisfaction: 
    - After logging in, club admin should be able to see their personalized dashboard/profile
    - After logging in, club admin should be able to create events and see them listed under “My Events”
- Subtasks: 
    - Set up cookies
    - Create events page - get club name from cookie
    - Club profile - get club name from cookie

4. **MIN-21:**
- Priority: low
- Point estimation: 5
- Criteria of satisfaction: 
    -  Make sure club admins can manually remove members from their club
    -  Students may get removed from club for various reasons(inappropriate behaviour, absence, transfer, etc) which means they no longer should get the notification
- Subtasks: 
    - Create button for removing members
    - Implement functionality for button
    - Update page to read cookie
    - Update older user story to read cookie

5. **MIN-16:**
- Priority: medium
- Point estimation: 8
- Criteria of satisfaction: 
    - Students are able to view their followed/joined clubs so they can make the necessary modifications they desire
     -  I.e. unfollow, change notifications preferences, check out a specific club event, etc
- Subtasks:  
    - Implement new route to view all student-club relationships
    - Implement UI and front-end to view all clubs for the logeed-in student
    - Make sure the cookie to check log-in status works, or else page will not work as intended

6. **MIN-17:**
- Priority: medium
- Point estimation: 21
- Criteria of satisfaction: 
    - Make sure I can choose whether I want to receive notifications in my email
    - Emails are sent at the same time as the notification arrives in the inbox
    - Make sure notifications sent by any of the clubs that are followed/joined are received by the student
    - Make sure once a student has unjoin/unfollowed, they no longer receive notifications
- Subtasks:  
    - Send an email on announcement creation
    - Create notification drawer component
    - /notif/get endpoint
    - follow button
    - unfollow functionality
    - following endpoints

7. **MIN-24:**
- Priority: low
- Point estimation: 3
- Criteria of satisfaction: 
    - Make sure when a logged in student joins an event, they are displayed in the list of attendees
    - Join button should change to "Joined" after joining
    - If button clicked again, should change to Join and remove them from the list
- Subtasks:  
    - Get user's info from cookies
    - Add the user to the event attendees' list
    - When clicked again, remove the user from the event attendees' list
 
 8. **MIN-28:**
- Priority: low
- Point estimation: 8
- Criteria of satisfaction: 
    - After entering a search query, the page should display events/clubs relevant to the query (i.e. relevant tags/words found in description)
- Subtasks:  
    - Create search bar UI
    - Implement the search bar functionality

 9. **MIN-29:**
- Priority: low
- Point estimation: 8
- Criteria of satisfaction: 
    - When a student clicks on a club profile, they should be redirected to the club profile
    - On the profile, the student should be able to see their contact information, club description, events, etc.
- Subtasks:  
    - Finished UI
    - make it fetch the correct information
    - add js docs


## Spikes 
- none

## Team capacity
Team member | Capacity (hr/day)
--------| -----------
Arailym Mussilim | 3
Amy Li | 3
Noah Cristino | 2
Tharuth | 1
Dhruv Patel | 2
Faraz Malik | 1
Priyank Dave | 2

## Participants
Arailym Mussilim, Amy Li, Noah Cristino, Tharuth, Dhruv Patel, Faraz Malik, Priyank Dave




