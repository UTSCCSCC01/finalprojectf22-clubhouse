# Sprint 1 Planning Meeting
We had our first Sprint 1 meeting on the 28th of September where we discussed which user stories need to be accomplished for Sprint 1. Another goal of the meeting was to distribute the tasks among the team members. All of us participated in the meeting. After having chosen the five user stories that we believe are necessary for our app’s basic functionality, we have evaluated the user stories using planning poker. 

## Sprint Goals
Finish user stories MIN-1, MIN-3, MIN-6, MIN-9, MIN-10

## Current sprint velocity
76

## User stories and subtasks
1. **MIN-1:** 
- Priority: high
- Point estimation: 21
- Criteria of satisfaction: 
    - Make sure a student can register using my UOFT email
    - Make sure emails other than UOFT ones cannot register/login
    - Make sure once registered, the student is able to sign in using their credentials that they used to register
    - Logging in as a student will take the student to the student-side home page
- Subtasks: 
    - Register
    - Create /register api endpoint to start verification process
    - Create /submitCode endpoint to verify that user owns email
    - Create RegisterForm component to enter details and verification code
    - Create module that automates emails
    - Create and update DAO for user and potentialUser db

2. **MIN-3:**
- Priority: high
- Point estimation: 8
- Criteria of satisfaction: 
    - Make sure every student can see a list of clubs, and browse through them
- Subtasks:  
    - Set-up back-end club format and burner clubs to test.
    - Create front-end UI and fetch back-end info to map.
- Make it look pretty.
- Add image support to front-end.

3. **MIN-6:** 
- Priority: high
- Point estimation: 13
- Criteria of satisfaction: 
    - Make sure every student can see and register for any of the upcoming events.
    - Students are able to explore new events by browsing through the list of upcoming events.
    - Events hosted by clubs can also be filtered by the category of the club itself
- Subtasks: 
    - Create basic Student Navbar
    - Create UI for “upcoming events” page with a sorting function
    - Create API endpoints for fetching data from the database and displaying it on the page
    - Implement the filter function

4. **MIN-9:**
- Priority: high
- Point estimation: 13
- Criteria of satisfaction: 
    - Make sure a club admin is able to create an event
    - Make sure events are displayed under upcoming events
- Subtasks: 
    - Create UI for new event form
    - Implement storing a new event in the database
    - Page redirection after user clicks submit/cancel
    - Add image upload

5. **MIN-10:**
- Priority: high
- Point estimation: 21
- Criteria of satisfaction: 
    - Make sure club admins edit the information that is shown to the students about the club
    - Students can get a general overview about the club
    - Make sure events are displayed under a club's profile
- Subtasks:  
    - Added Contact (Email and Phone) and Description fields for club admins
    - Make fields editable and save the changes made
    - Work on UI to make page aesthetic
    - Apply CSS to make the containers aligned
    - Make profile page responsive

## Spikes 
- Most of our team members did not have prior experience with MERN stack, so we had to learn from scratch
- We had to learn material UI, a front-end framework for React components -> therefore, we encountered some issues with styling the pages 

## Team capacity
Team member | Capacity (hr/day)
--------| -----------
Arailym Mussilim | 2
Amy Li | 3.5
Noah Cristino | 3
Tharuth | 0-2 (W1-W2 Tues) || 8-12+ (W2 Wed-Fri)
Dhruv Patel | 3
Faraz Malik | 2.5
Priyank Dave | 3

## Participants
Arailym Mussilim, Amy Li, Noah Cristino, Tharuth, Dhruv Patel, Faraz Malik, Priyank Dave






