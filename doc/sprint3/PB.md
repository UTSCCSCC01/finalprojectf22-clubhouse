### High:

1. As a student, I want to register so that I can securely manage and use my individualized account.
* COS: 21 points
    * Make sure a student can register using my UOFT email
    * Make sure emails other than UOFT ones cannot register/login
    * Make sure once registered, the student is able to sign in using their credentials that they used to register

2. As a student, I want to login so that I can securely manage and use my individualized account
* COS: 13 points
    * Login and store authenticated user in a cookie
    * Make sure password and username match database
    * Logging in as a club will send you to the club-side home page

3. As a student, I want to browse through a list of existing clubs so that I can see all the clubs at UTSC. 
* COS: 8 points
    * Make sure every student can see a list of clubs, and browse through them

4. As a student, I want to filter clubs/events by categories so that I can view clubs/events relevant to me.
* COS: 8 points
    * Clubs are sorted by the user’s “areas of interest” by default
    * Clubs can be filtered and sorted by categories that the clubs put themselves into
    * Students can choose the specific category they want to browse

6. As a student, I want to browse through upcoming club events so that I can register/attend events I’m interested in.
* COS: 13 points
    * Make sure every student can see and register for any of the upcoming events.
    * Students are able to explore new events by browsing through the list of upcoming events.
    * Events hosted by clubs can also be filtered by the category of the club itself

7. As a student, I want to join/apply to clubs so that I can become a general club member.
* COS: 13 points
    * Make sure every student can apply to any of the clubs on the clubs profile page.
    * Once accepted, the student must receive all notifications related to that club.

8. As a club admin, I want to make announcements so that I can notify members/followers of upcoming events/club updates.
* COS: 8 points
    * Make sure club admins can post information about the club/upcoming events which send notifications to the joined/following members

9. As a club admin, I want to create events so that students find out about it.
* COS: 13 points
    * Make sure a club admin is able to create an event
    * Make sure events are displayed under upcoming events

10. As a club admin, I want to add/modify/display profile details so that students can learn about the club and view contact details.
* COS: 21 points
    * Make sure club admins edit the information that is shown to the students about the club
    * Students can get a general overview about the club
    * Make sure events are displayed under a club's profile

### Mid:


12. As a club admin, I want to see the members of my club so I can manage and prepare for events accordingly.
* COS: 5 points
    * Make sure a list of current members of the club is shown to the club admin

13. As a club admin, I want to approve/deny club register requests so I can select the qualified members to join the club.
* COS: 13 points
    * Students that apply to the clubs appear to the club admin where they can decide to let them join or deny their request

14. As a club admin, I want to post executive positions descriptions so that I can receive/review applications.
* COS: 8 points
    * Make sure club admins can review all the applications for posting
    * Make sure all students can see the available hiring ads.
    * Easily able to choose qualified members for posting in an orderly fashion. (Tentative, can also just leave it to email).

15. As a club admin, I want to be able to request to register a club so I can have a club account.
* COS: 13 points
    * Club admins can submit a request to form a new club once they register
    * Club admins can fill out a form detailing their club name, club description, club tags, etc.

16. As a student, I want to see a list of clubs I'm following/a member of so I can keep track of them.
* COS: 8 points
    * Students are able to view their followed/joined clubs so they can make the necessary modifications they desire
        * I.e. unfollow, change notifications preferences, check out a specific club event, etc

### Low:


17. As a student, I should want to follow clubs so that I get notifications (email/inbox) for announcements/events as wanted.
* COS: 21 points
   * Make sure I can choose whether I want to receive notifications in my email
   * Emails are sent at the same time as the notification arrives in the inbox
   * Make sure notifications sent by any of the clubs that are followed/joined are received by the student
   * Make sure once a student has unjoin/unfollowed, they no longer receive notifications



21. As a club admin, I want to remove members so that members who are kicked off or quit the club no longer get the notifications sent to the current members.
* COS: 5 points
    * Make sure club admins can manually remove members from their club
    * Students may get removed from club for various reasons(inappropriate behaviour, absence, transfer, etc) which means they no longer should get the notifications

22. As a system admin, I want to approve/deny club registration requests so that approved clubs can be added to the website.
* COS: 8 points
    * They must be approved by the system admin before they can proceed to form a club
    * If denied, the individual who sent the request receives a rejection email
    * If accepted, they are provided with the credentials they can use to sign in as a club admin.

23. As a system admin, I want to remove clubs so that students cannot see clubs that no longer exist.
* COS: 5 points
    * Make sure clubs that are deleted by the system admin are no longer seen by students, thus they can no long join it
    * The club admin of that club cannot no longer sign into their club account
    * All students in that club are removed from the club


24. As a student, I want to be able to register for events so that I can attend events I'm interested in.
* COS: 3 points
    * Make sure when a logged in student joins an event, they are displayed in the list of attendees
    * Join button should change to Joined after joining
    * If button clicked again, should change to Join and remove them from the list

25. As a club admin, I want to login so that I can manage my club.
* COS:
    * One must be approved by the system admin before being able to login as a club
    * The club admin account will be associated with the specified email by the system admin
    * Logging in as a club will send you to the club-side home page

26. As a club admin, I want to see personalized pages so that I can manage club activities.
* COS: 5 points
   * After logging in, club admin should be able to see their personalized dashboard/profile
   * After logging in, club admin should be able to create events and see them listed under “My Events”

27. As a system admin, I want to log in so that I can manage clubs.
* COS: 8 points
   * System admin should be able to log in
   * User should be redirected after logging in

28. As a student, I want to search through events and clubs using a search bar so that I can find events/clubs I’m interested in.
* COS: 8 points
   * After entering a search query, the page should display events/clubs relevant to the query (i.e. relevant tags/words found in description)

29. As a student, I want to see a club profile so that I can learn about the club.
* COS: 8 points 
   * When a student clicks on a club profile, they should be redirected to the club profile
   * On the profile, the student should be able to see their contact information, club description, events, etc.
