# ASCII platformer
### By LordOfTheCube1 (discord LordOfTheCube#0419)

See License before using any code :)

### IMPORTANT: How to use level.json
- **KEEP ANY SQUARE BRACKETS THAT ARE THERE**
- For each new thing that you want to add, add a pair of **curly braces** "{ }", followed by a **comma**
- Your code should now look like this:
```json
[
    {

    },
]
```
- Add the following things, so that your code looks like this:
```json
[
    {
      "type": "insert type here",
      "bottomY": "wherever your object should start",
      "topY": "wherever your object should end",
      "x": "the x value that your object should be located at",
      "cut": "if it is a wall, should the top block be a floor or a wall block"
    },
]
```
- Add as many objects as you want (See guide below for what the values should be)

type -> either a wall or a floor. (speech marks required)

bottomY -> the y-value at which your object should start (Note: the floor is y=29 and the roof is y=0) (no speech marks)

topY -> the y-value at which your object should end. This is not needed for a floor object. (no speech marks)

x ->  the x-value at which your object should be located (for a 2 wide floor you need 2 objects) (no speech marks)

cut -> this is optional for walls, not needed for floors. only needed if you don't want the top block to be a "=", in which case set this to true (no speech marks)

Ignore all of the info about speech marks if you know how JSON files should be formatted, and just use that knowledge instead (sorry if I made it confusing)

An example can be found in the level.json file already.

#### How to run this code for yourself

I don't mind if you decide to run this on your own machine. If you run it on your own website, please give credit.

If you do decide to run this on your own machine, bear in mind that you cannot just open the html file. You need to run it on a local server. To do this make sure that you have **npm** installed by typing `npm -v` into command prompt, powershell or terminal. *If it returns an error, or anything other than a number (for example `6.14.8`, or `7.24.1`), you do not have it correctly installed.* Then type `npm i http-server -g` into the command prompt. Sometimes you may have to give permission or do other stuff, google anything if you are unsure. In the commmand prompt, navigate to the folder which contains all of the code, and then type `http-server`. If successful, it will tell you where to go to access the code. Every time you update the code, you have to *hard reload*, which can be done by right-clicking on the reload button and clicking **hard reload**, or by pressing **ctrl + shift + r**.
