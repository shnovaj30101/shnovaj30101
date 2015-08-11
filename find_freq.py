
import wave
import matplotlib.pyplot as plt
import numpy as np
import scipy as sp
import sys
import subprocess

thres = 400
method = 'default'
if len(sys.argv) == 3:
	thres = float(sys.argv[2])
if len(sys.argv) == 4:
	method = sys.argv[3]
subprocess.call('aubiopitch -p '+method+' -i '+sys.argv[1]+' > output', shell=True)

f = open('output', "rb")

pitches = [[float(x) for x in line.split()] for line in f]

noise_m=20
noise_range=10
detect_noise=False
j=0

for i in range(1,len(pitches)):
	if pitches[i][1] > thres:
		pitches[i][1] = 0
	if abs(pitches[i][1]-pitches[i-1][1]) > noise_m and not detect_noise:
		detect_noise=True
		j=j+1

	elif (abs(pitches[i][1]-pitches[i-1][1]) > noise_m) and detect_noise and j>0:
		if j<noise_range:
			for k in range(1,j+1):
				pitches[i-k][1] = 0
		j=1

	if abs(pitches[i][1]-pitches[i-1][1]) < noise_m and detect_noise:
		j=j+1
		
	

fig = plt.figure()
ax1 = fig.add_subplot(111)
array = np.asarray(pitches)
ax1.plot(array[:,0],array[:,1])
plt.show()
