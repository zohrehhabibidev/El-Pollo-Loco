# El Pollo Loco

A browser-based jump-and-run game built with HTML, CSS, JavaScript, and Canvas.

The player controls Pepe, collects coins and salsa bottles, avoids or defeats chickens, and fights the final endboss.

## How to Start

Open `index.html` in a browser.

Recommended: use a local development server, for example the Live Server extension in VS Code.

The game does not start automatically. Click the Start button on the landing screen to begin.

## How to Play

Move through the level, collect bottles and coins, defeat normal enemies, and use collected bottles to damage the endboss.

The game ends when:

- Pepe loses all health.
- The endboss is defeated.

After losing or winning, the player can restart the game or return to the menu without reloading the page.

## Controls

- `Arrow Left`: Run left
- `Arrow Right`: Run right
- `Space`: Jump
- `D`: Throw a bottle

## Features

- Landing / start screen
- Guide / help dialog
- Playable character with movement, jump, hurt, idle, long idle / sleep, and death states
- Health status bar
- Collectible coins with coin status bar
- Collectible bottles with bottle status bar
- Throwable bottles
- Normal chickens and small chickens
- Enemies can be defeated by bottles
- Enemies can be defeated by jumping on them from above
- Endboss with health bar
- Endboss takes damage from bottles
- Win and lose screens
- Restart and menu navigation without page reload
- Background music and sound effects
- Mute button with saved mute state using localStorage
- Impressum page
- Mobile touch controls
- Portrait warning for mobile devices
- Landscape-only mobile gameplay
- Bottle throw arc with left and right direction
- Bottle splash animation after hits
- Cleanup for missed thrown bottles

## Mobile Support

Mobile touch controls are available in landscape mode.

In portrait mode, a rotate-device warning is shown so the player knows to turn the device before playing.

The mobile landscape layout includes touch buttons for movement, jumping, and throwing bottles.

## Technologies Used

- HTML
- CSS
- JavaScript
- Canvas API
- localStorage

## Project Structure

- `index.html` - Main page
- `css/` - Stylesheets
- `js/` - JavaScript files
- `js/classes/` - Game object classes
- `assets/img/` - Images and sprites
- `assets/audio/` - Music and sound effects
- `assets/fonts/` - Local fonts
- `impressum.html` - Impressum / legal information

## Credits

This project uses external audio, image, and font assets for educational purposes.

Background music:
https://pixabay.com/music/video-games-game-gaming-video-game-music-471936/

Win sound:
https://pixabay.com/users/doge_goober57-41887056/

Game over sound:
https://pixabay.com/users/audley_fergine-32337609/

Game graphics / sprites:
El Pollo Loco learning project assets provided as part of the course material.

Font:
Zabars font included locally in `assets/fonts/`.

## Legal

This project includes an Impressum page:

`impressum.html`

## Status

This project was built as part of a frontend learning project.
