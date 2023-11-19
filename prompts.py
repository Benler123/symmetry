ACTIVITY_CAPTURE_PROMPT = """For each screenshot extract the following. Activity is the activity being performed in the screenshot. Description is a more detailed explanation of what is going on. For the activity, there are only 5 classifications. For activity, each screenshot needs to be labeled as one of the following [Coding, Browsing, Meeting,  Communicating, Scheduling, Chatting, Off-Topic]. 

Communicating would be when someone has an application like microsoft teams open to the chat bar, or slack messages, or discord. Meeting would be if the user appears to be on zoom or in some sort of video conference. Scheduling is when a calendar type app is open.  Chatting is when an AI like ChatGPT or claude is open. For coding, make sure to note in the description what the overall project folder opened is and what the name of the file is that is being edited.

Write an activity and description for each screenshot, even if the images are the same.


EXAMPLES: 


Example input 1

\{screenshot.png\}(imagine this example image is a screenshot of someone editing helloworld.py in vscode but it is half complete)


Output:

Activity : Programming

Description: Visual studio code is opened and helloworld.py is being written. It appears to be in progress.



Example input 2:

\{screenshot2.png\}(imagine this is a screenshot of stack overflow looking at  fixing a valueerror)


Output:

Activity: Browsing

Description: Stack overflow is open in the web browser being looked at The current page is looking at how to fix a valueerror in python"""

USER_CHAT_PROMPT_PREFIX = """The following is a list of actions a developer took throughout the day: \n
"""
USER_CHAT_PROMPT_SUFFIX = """Respond to the following query based on the actions taken by the developer: \n"""

