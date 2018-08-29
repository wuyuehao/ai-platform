from concurrent.futures import ProcessPoolExecutor
from flask import Blueprint, send_from_directory
import time
executor = ProcessPoolExecutor(max_workers=10)


def task(i):
	time.sleep(1)
	print('inner' + str(i))

list = [1,2,3,4,5]

executor.map(task, list)
