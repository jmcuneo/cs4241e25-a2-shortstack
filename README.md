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
- **Design Achievement 2**: I interviewed a friend, Collin Shuff, for the beta testing. The only problem he encountered was not realising that the due date expecting a time as well as a date, but that was rectified when he hit the "Add Task" button and it told him that a field was missing. He asked me how the tasks were sorted, if it was by priority or by due date, which was something I did not fully expect to be asked, but I did appreciate the question. I don't think I would make any changes to the design based on this feedback, other than potentially adding a sub-label for the due date specifying that a time is needed, and that the date needs to be in the future. 