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


# CS4241 Assignment 2 - Nick Smith

https://a2.greenbueller.com/

## Magnolia Task Manager
The Magnolia Task Manager is a simple program that allows the user to create a "task" for any point from the current time (setting one in the past is not supported), and have it listed by priority and by deadline. The user is able to mark off completed tasks with a checkbox at the end of the table on the Tasks page, while they can add more tasks on the home page.

If a task is due within 1 day and it is not marked as completed, it will turn to the highlight colour described in the pallette.

**NOTE**: If the page is offline and you go to a cloudflare page, please reload the page. For some reason, when Render turns the service on, Cloudflare will cause an issue rather than sending you to the correct page directly.

## Technical Achievements
- **Tech Achievement 1**: I managed to implement a system where the user can check off tasks to mark them as completed. This was challenging as I had to figure out how to save the original priority and deadline of the task before marking it as completed, as I also allow the user to 'uncomplete' a task.
- **Tech Achievement 2**: The tasks were originally listed in order of adding to the list, but I managed to make it so they will instead list in order of priority (High, Medium, Low), and within that priority by the deadline. Unfortunately, this breaks once a task is marked as completed at any point.

### Design/Evaluation Achievements
- **Design Achievement 1**: I implemented a colour pallette for this task, and made use of variables in my CSS to avoid having to copy/paste the hex code of said colours each time I used them.
