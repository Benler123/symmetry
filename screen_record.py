from PIL import ImageGrab
import time 
import os

def take_screenshot(interval, duration):
    """
    Takes screenshots at a specified interval for a given duration.
    
    :param interval: Time in seconds between each screenshot.
    :param duration: Total duration in seconds for which screenshots will be taken.
    """
    end_time = time.time() + duration
    screenshot_number = 1

    # Create a directory to save screenshots if it doesn't exist
    os.makedirs('screenshots', exist_ok=True)

    while time.time() < end_time:
        # Capture the screen
        screenshot = ImageGrab.grab()
        # Save the image file
        screenshot.save(f'screenshots/screenshot_{screenshot_number}.png')
        screenshot_number += 1
        # Wait for the next interval
        time.sleep(interval)

# Example usage: Take a screenshot every 5 seconds for 1 minute
take_screenshot(5, 60)