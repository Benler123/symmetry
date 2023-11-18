from PIL import ImageGrab
import time 
import os

def take_screenshot(interval, duration):
    end_time = time.time() + duration
    screenshot_number = 1
    os.makedirs('screenshots', exist_ok=True)

    while time.time() < end_time:
        # Capture the screen
        ss_start_time = time.time()
        screenshot = ImageGrab.grab()
        ss_end_time = time.time() 
        print(f'Took screenshot {screenshot_number} in {ss_end_time - ss_start_time} seconds')
        # Save the image file
        save_start_time = time.time()
        screenshot.save(f'screenshots/screenshot_{screenshot_number}.png')
        save_end_time = time.time()
        #print how long it took to save 
        print(f'Saved screenshot {screenshot_number} in {save_end_time - save_start_time} seconds')
        screenshot_number += 1
        time.sleep(interval)
take_screenshot(1, 60)