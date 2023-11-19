from PIL import ImageGrab
import time 
import math
import statistics 
import io
import base64
import requests
import argparse 


TIME_INTERVAL = 30

argparse = argparse.ArgumentParser()
argparse.add_argument("--server_url", help="The URL of the server to send the images to.")
argparse.add_argument("--userid", help="The user id of the user.")

args = argparse.parse_args()


class ScreenCaptureClient:
    def __init__(self, server_url="http://localhost:5000/"): 
        self.mean = None
        self.median = None 
        self.framerate_supported = None 
        self.time_buffer = []
        self.server_url = args.server_url
        self.user_id = args.userid
        if self.user_id == None: 
            raise Exception("USER ID: NONE -- User ID Missing, try checking the command line arguments.")
    #method to create a buffer and guess on how many images the computer can process
    def initialize_client_buffer(self): 
        print("Important, if system dialogue pops up, please allow access to screen recording.")   
        permission_image = ImageGrab.grab()
        #checks if mac supports framerate
        print("Initializing client for capture.")
        times = []
        for i in range(10):
            ss_start_time = time.time()
            image = ImageGrab.grab()
            buffered = io.BytesIO()
            image.save(buffered, format="PNG")
            base64.b64encode(buffered.getvalue()).decode("utf-8")
            ss_end_time = time.time()
            times.append(ss_end_time - ss_start_time)
        self.mean = statistics.mean(times)
        self.median = statistics.median(times)
        self.framerate_supported = math.floor((1 / (self.mean)) * (TIME_INTERVAL))
        self.time_buffer = times
        print("initialized client.")
    #captures 1 minute worth of images without buffering based on expected framerate 
    def capture_interval(self, seconds=60):
        interval_images = []
        time_accumulator = 0.0 
        while time_accumulator < seconds:
            start_time = time.time()
            image = (ImageGrab.grab())
            #convert image to base64
            buffered = io.BytesIO()
            image.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            interval_images.append(img_str) 
            end_time = time.time()
            time_accumulator += (end_time - start_time)
        return interval_images
    #captures 1 minute worth of images and calculates the framerate
    def capture_interval_system_buffer(self):
        print("capturing interval")
        interval_images = []
        for i in range(self.framerate_supported):
            ss_start_time = time.time()
            image = (ImageGrab.grab())
            #convert image to base64
            buffered = io.BytesIO()
            image.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            interval_images.append(img_str)
            ss_end_time = time.time()
            #remove the first element from the time buffer
            self.time_buffer.pop(0)
            self.time_buffer.append(ss_end_time - ss_start_time)
        self.framerate_supported = math.floor((2 / (statistics.mean(self.time_buffer))) * TIME_INTERVAL)
        return interval_images
    def export_to_server(self, interval_images):
        print("Exporting to server.")
        #send the images to the server
        image_data = {"images": interval_images}
        try:
            response = requests.post(self.server_url, json=image_data)
            print(response)
        except:
            print("Here")
if __name__ == '__main__':
    #Create a terminal UI for the user to input the server URL, and once the URL is appended continuously capture and export images
    banner = """
 __                            
 (_     ._ _  ._ _   _ _|_ ._   
 __) \/ | | | | | | (/_ |_ | \/ 
     /                       /  
    """
    print(banner)
    print("Screen Capture Client")
    client = ScreenCaptureClient("http://localhost:8001/upload")
    print(client.user_id)
    client.initialize_client_buffer()
    
    while True:
        client.export_to_server(client.capture_interval_system_buffer())



    
    
