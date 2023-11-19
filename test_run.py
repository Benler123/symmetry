import pyperclip
t = """
(1, "Visual Studio Code is open with a file named 'test.ipynb'", "Coding", "RandomString1")
(1, "Microsoft Teams is open with the chat interface visible", "Communicating", "RandomString2")
(1, "A YouTube video is playing, titled 'Chill Night Drives'", "Browsing", "RandomString3")
(1, "The web browser is displaying Instagram with the user's profile logged in", "Browsing", "RandomString4")
(1, "The Nike online store is open in a web browser", "Browsing", "RandomString5")
(1, "A Python script named 'hello_world.py' is open in Visual Studio Code", "Coding", "RandomString6")
(1, "Google Meet interface with a meeting titled 'Dev Team Update'", "Meeting", "RandomString7")
(1, "The user is editing 'hello_world.py' in Visual Studio Code", "Coding", "RandomString8")
(1, "Slack is open, and the user is in a conversation with a colleague named 'Emily Zhao'", "Communicating", "RandomString9")
(1, "The user is on Stack Overflow, looking at a question about Python syntax errors", "Browsing", "RandomString10")
(2, "Microsoft Teams is open with a meeting titled 'Sprint Planning'", "Meeting", "RandomString11")
(2, "The user is working in 'hello_world.py' on Visual Studio Code", "Coding", "RandomString12")
(2, "An email client is open, showing a draft email to a colleague asking for help with the 'hello_world.py' script", "Communicating", "RandomString13")
(2, "A browser is open on a tutorial website, showing a Python tutorial for beginners", "Browsing", "RandomString14")
(2, "Visual Studio Code is displaying 'hello_world.py'", "Coding", "RandomString15")
(2, "Zoom interface showing a retrospective meeting with the development team", "Meeting", "RandomString16")
(2, "A chat window in Microsoft Teams is open", "Communicating", "RandomString17")
(2, "The user is refactoring 'hello_world.py' in Visual Studio Code", "Coding", "RandomString18")
(2, "The user is on GitHub, reviewing a repository related to Python programming", "Browsing", "RandomString19")
(2, "The user is in a virtual coffee break with colleagues on Google Meet", "Meeting", "RandomString20")
(3, "Visual Studio Code is open with 'hello_world.py'", "Coding", "RandomString21")
(3, "A screen share in a Zoom call showing a code review session", "Meeting", "RandomString22")
(3, "The user is sending a message on Slack, asking for suggestions on how to improve their 'hello_world.py' script", "Communicating", "RandomString23")
(3, "The 'hello_world.py' file is open, and the user is testing a newly added exception handling block", "Coding", "RandomString24")
(3, "The user is on a coding forum, reading a post about best practices in Python coding", "Browsing", "RandomString25")
(3, "Microsoft Teams is showing a one-on-one meeting with a senior developer", "Meeting", "RandomString26")
(3, "'hello_world.py' is open, and the user is now adding a logging feature", "Coding", "RandomString27")
(3, "An email is being composed to a mentor, attaching the latest version of 'hello_world.py'", "Communicating", "RandomString28")
(3, "The user is researching Python libraries on a web browser", "Browsing", "RandomString29")
(3, "The user is in a virtual team lunch over Google Meet", "Meeting", "RandomString30")
(4, "In Visual Studio Code, 'hello_world.py' is being expanded with additional print statements", "Coding", "RandomString31")
(4, "The user is on a video call with a colleague, discussing potential improvements to the 'hello_world.py' script", "Communicating", "RandomString32")
(4, "The user is integrating a simple GUI into 'hello_world.py' using a Python library", "Coding", "RandomString33")
(4, "The user is looking at Python GUI frameworks on their browser", "Browsing", "RandomString34")
(4, "The user is attending a webinar on advanced Python programming", "Meeting", "RandomString35")
(4, "Visual Studio Code shows 'hello_world.py' being optimized for performance", "Coding", "RandomString36")
(4, "A chat in Microsoft Teams shows the user discussing the performance improvements in 'hello_world.py'", "Communicating", "RandomString37")
(4, "The user is in a virtual meeting on Google Meet, discussing the roadmap for further development of their Python projects", "Meeting", "RandomString38")
(4, "'hello_world.py' in Visual Studio Code now includes comments for each function", "Coding", "RandomString39")
(4, "The user's browser is open to a Python coding challenge website", "Browsing", "RandomString40")
(5, "Zoom is open with a screen share, showing a peer-review session", "Meeting", "RandomString41")
(5, "The user is writing unit tests for 'hello_world.py' in Visual Studio Code", "Coding", "RandomString42")
(5, "An ongoing email thread is visible, where the user is seeking advice from a more experienced developer on unit testing in Python", "Communicating", "RandomString43")
(5, "The user is on a documentation site, looking up best practices for writing unit tests in Python", "Browsing", "RandomString44")
(5, "A Microsoft Teams meeting titled 'Code Quality Workshop' is in progress", "Meeting", "RandomString45")
(5, "Visual Studio Code displays 'hello_world.py' with newly added comments explaining the purpose of each unit test", "Coding", "RandomString46")
(5, "Slack shows the user discussing the outcomes of the unit tests with their development team", "Communicating", "RandomString47")
(5, "The user is in a Zoom call titled 'Python Best Practices'", "Meeting", "RandomString48")
(5, "The user is refactoring parts of 'hello_world.py' to make the code more modular and easier to maintain", "Coding", "RandomString49")
(5, "The user's web browser is open to a blog about Python programming", "Browsing", "RandomString50")
(6, "Google Meet is showing a team brainstorming session", "Meeting", "RandomString51")
(6, "In Visual Studio Code, the user is implementing a new feature in 'hello_world.py'", "Coding", "RandomString52")
(6, "The user is sending a message on Microsoft Teams, discussing the implementation of the new feature in 'hello_world.py'", "Communicating", "RandomString53")
(6, "A web browser is open on a Python tutorial page", "Browsing", "RandomString54")
(6, "A Zoom call is in session titled 'Weekly Progress Update'", "Meeting", "RandomString55")
(6, "Visual Studio Code displays 'hello_world.py' with a new section for error handling and exceptions", "Coding", "RandomString56")
(6, "The user is emailing a mentor, asking for feedback on the error handling approach in 'hello_world.py'", "Communicating", "RandomString57")
(6, "Microsoft Teams shows a meeting with a user interface designer", "Meeting", "RandomString58")
(6, "The user is integrating a simple graphical interface into 'hello_world.py'", "Coding", "RandomString59")
(6, "The user's browser shows a site with Python GUI examples", "Browsing", "RandomString60")
(7, "A virtual team-building activity is visible on Google Meet", "Meeting", "RandomString61")
(7, "'hello_world.py' on Visual Studio Code now includes a function to save user inputs to a file", "Coding", "RandomString62")
(7, "Slack displays a discussion about the ethics of data storage and user privacy", "Communicating", "RandomString63")
(7, "The user is on a legal advice website, reading about data privacy laws", "Browsing", "RandomString64")
(7, "A Microsoft Teams call titled 'Data Privacy Compliance' shows the user discussing legal considerations for their project", "Meeting", "RandomString65")
(7, "Visual Studio Code is showing 'hello_world.py' with added encryption for stored user data", "Coding", "RandomString66")
(7, "The online store is open in a web browser", "Browsing", "RandomString67")
(7, "The web browser is displaying Instagram with a user's profile logged in", "Communicating", "RandomString68")
(7, "The online store is open in a web browser", "Meeting", "RandomString69")
(7, "Slack is open, and the user is in a conversation with a colleague named 'Colleague 70'", "Browsing", "RandomString70")
(8, "The user is editing 'script_71.py' in Visual Studio Code", "Meeting", "RandomString71")
(8, "The online store is open in a web browser", "Communicating", "RandomString72")
(8, "Visual Studio Code is open with a file named 'file_73.py'", "Meeting", "RandomString73")
(8, "The web browser is displaying Instagram with a user's profile logged in", "Coding", "RandomString74")
(8, "Visual Studio Code is open with a file named 'file_75.py'", "Browsing", "RandomString75")
(8, "The user is on Stack Overflow, looking at a question about a topic 76", "Meeting", "RandomString76")
(8, "Slack is open, and the user is in a conversation with a colleague named 'Colleague 77'", "Coding", "RandomString77")
(8, "The web browser is displaying Instagram with a user's profile logged in", "Communicating", "RandomString78")
(8, "The user is on Stack Overflow, looking at a question about a topic 79", "Meeting", "RandomString79")
(8, "The online store is open in a web browser", "Browsing", "RandomString80")
(9, "A Python script named 'script_81.py' is open in Visual Studio Code", "Browsing", "RandomString81")
(9, "Google Meet interface with a meeting titled 'Meeting Title 82'", "Meeting", "RandomString82")
(9, "A Python script named 'script_83.py' is open in Visual Studio Code", "Meeting", "RandomString83")
(9, "A YouTube video is playing, titled 'Video Title 84'", "Browsing", "RandomString84")
(9, "The user is editing 'script_85.py' in Visual Studio Code", "Coding", "RandomString85")
(9, "A Python script named 'script_86.py' is open in Visual Studio Code", "Coding", "RandomString86")
(9, "The online store is open in a web browser", "Communicating", "RandomString87")
(9, "Google Meet interface with a meeting titled 'Meeting Title 88'", "Communicating", "RandomString88")
(9, "A YouTube video is playing, titled 'Video Title 89'", "Browsing", "RandomString89")
(9, "The online store is open in a web browser", "Coding", "RandomString90")
(10, "The web browser is displaying Instagram with a user's profile logged in", "Communicating", "RandomString91")
(10, "A Python script named 'script_92.py' is open in Visual Studio Code", "Meeting", "RandomString92")
(10, "A YouTube video is playing, titled 'Video Title 93'", "Communicating", "RandomString93")
(10, "The web browser is displaying Instagram with a user's profile logged in", "Communicating", "RandomString94")
(10, "Google Meet interface with a meeting titled 'Meeting Title 95'", "Browsing", "RandomString95")
(10, "The user is on Stack Overflow, looking at a question about a topic 96", "Meeting", "RandomString96")
"""

t = t.replace("(", "insert_batch_image_data(")
pyperclip.copy(t)


insert_batch_metadata("Dhruv Shah", "2023-11-19")
insert_batch_metadata("Ben Steele", "2023-11-19")
insert_batch_metadata("Matt Steele", "2023-11-13")
insert_batch_metadata("Matt Steele", "2023-11-14")
insert_batch_metadata("Tyler Kwok", "2023-11-15")
insert_batch_metadata("Tyler Kwok", "2023-11-15")
insert_batch_metadata("Tyler Kwok", "2023-11-16")
insert_batch_metadata("Dhruv Shah", "2023-11-17")
insert_batch_metadata("Dhruv Shah", "2023-11-18")
insert_batch_metadata("Ben Steele","2023-11-19")


"""
2023-11-19
2023-11-18
2023-11-17
2023-11-16
2023-11-15
2023-11-14
2023-11-13
"""