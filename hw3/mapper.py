#!/usr/bin/env python

import sys

for line in sys.stdin:
    line = line.strip()
    left = line.index('Mar') - 3
    right = line.index('2004') + 4
    print("%s\t%d"%(line[left: right], 1))
