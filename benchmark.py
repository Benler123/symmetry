from PIL import ImageGrab
import time 
import os
import statistics


times = []
for i in range(10):
    start = time.time()
    screenshot = ImageGrab.grab()
    end = time.time()
    times.append(end - start)
    print(f'Took screenshot {i} in {end - start} seconds')
    #save the image file 
    start = time.time()
    screenshot.save(f'screenshots/screenshot_{i}.png')
    end = time.time()
    print(f'Saved screenshot {i} in {end - start} seconds')


print(f'Mean: {statistics.mean(times)}')
print(f'Median: {statistics.median(times)}')
print(f'Standard Deviation: {statistics.stdev(times)}')
