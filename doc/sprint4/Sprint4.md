# Sprint 4 Planning Meeting
We had our sprint 4 planning meeting on November 6th where we decided which user stories we needed to complete for sprint 4. In order to prepare for our final release, we introduced several new user stories for finalizing and integrating the different components and pages of our application, which we then assigned story points using planning poker. Another goal of the meeting was to distribute the user stories and tasks among the team members. All of us participated in the meeting. 

## Trello Invite:
https://trello.com/invite/b/RwdqWLOQ/ATTI5e52efad3543012c3670073555f50d9fFA228C4D/utsc-clubhouse

## Sprint Goals
Finish User stories MIN-22, 23, 30, 31, 32, 33, 34

## Current sprint velocity
60

## User stories and subtasks
1. **MIN-22:** 
- Priority: low
- Point estimation: 8
- Criteria of satisfaction: 
    * They must be approved by the system admin before they can proceed to form a club
    * If denied, the individual who sent the request receives a rejection email
    * If accepted, they receive an email and are provided with the credentials they can use to sign in as a club admin.
- Subtasks: 
    - Implement UI for seeing club registration requests
    - Implement endpoint for approving club registration requests
    - Implement endpoint for rejecting club registration requests
    - Implement email wrapper

2. **MIN-23:**
- Priority: low
- Point estimation: 5
- Criteria of satisfaction: 
    * Make sure clubs that are deleted by the system admin are no longer seen by students, thus they can no long join it
    * The club admin of that club cannot no longer sign into their club account
    * All students in that club are removed from the club
- Subtasks:
    - Properly implement the delete function to fully delete a club (i.e. need to remove the club's login info, members, events, job postings)
    - Make sure a club can't log-in afterward.

3. **MIN-30:** 
- Priority: low
- Point estimation: 8
- Criteria of satisfaction: 
    * Different navigation bars should be displayed for different types of users (not logged in/student/club admin/scsu)
- Subtasks: 
    - Create a navbar for not logged in, student, club, and SCSU
    - Link all pages
    - Implement logout


4. **MIN-31:**
- Priority: low
- Point estimation: 8
- Criteria of satisfaction: 
    * Users should be redirected if they are not authorized to view a page
    * Users should be redirected to login page if they click a button and are not logged in
- Subtasks: 
    - make function to simplify check
    - apply function to every page
    - test functionality

5. **MIN-32:**
- Priority: low
- Point estimation: 13
- Criteria of satisfaction: 
    * Student should be able to switch between tabs to see clubs and events and settings
    * A logged in student should be able to see a list of clubs they are a member of
    * A logged in student should be able to see a list of upcoming events they joined
    * Student should be able to leave clubs and events
- Subtasks:  
    - Create UI
    - Implement backend data fetch

6. **MIN-33:**
- Priority: low
- Point estimation: 5
- Criteria of satisfaction: 
    * Make UI look nice
- Subtasks:  
    - Make the layout of every page match
    - Update club profile pages to use MUI components
    - Display confirmation messages after creating an event/club request/job posting

7. **MIN-34:**
- Priority: low
- Point estimation: 13
- Criteria of satisfaction: 
    * A logged in student should be able to toggle whether they want to receive emails
    * The student should be able to choose a setting for each club they are a member of
- Subtasks:  
    - Create settings component
    - Create settings page
    - Update setting endpoint
    - Backwards compatibility for no notification

## Spikes 
- none

## Team capacity
Team member | Capacity (hr/day)
--------| -----------
Arailym Mussilim | 2
Amy Li | 2
Noah Cristino | 3
Tharuth | 1-2
Dhruv Patel | 2
Faraz Malik | 1.5
Priyank Dave | 2

## Participants
Arailym Mussilim, Amy Li, Noah Cristino, Tharuth, Dhruv Patel, Faraz Malik, Priyank Dave




