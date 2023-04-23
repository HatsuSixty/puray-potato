#!/bin/env python3

from subprocess import run
from sys import stderr

def get_password():
    try:
        f = open("./.sshpasswd", "r")
        return f.read().strip()
    except FileNotFoundError:
        print("ERROR: Could not find file `.sshpasswd`", file=stderr)
        exit(1)

cmd = run(["git", "status"], capture_output=True, text=True)

if not ("nothing to commit" in cmd.stdout):
    run(["git", "add", "random-str-idk-whatis"])
    run(["git", "commit", "-m", "Update token-like-thingy"])
    run(["git", "push", "origin", "master"])
