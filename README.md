# El Pollo Loco

A browser-based Jump and Run game built with HTML, CSS, JavaScript, and Canvas.

The player controls Pepe, collects coins and salsa bottles, avoids or defeats chickens, and fights the final endboss.

## How to Start

Open `index.html` in a browser.

Recommended:
Use a local development server, for example the Live Server extension in VS Code.

The game does not start automatically. Click the (Start) button on the landing screen to begin.

## How to Play

Move through the level, collect bottles and coins, defeat normal enemies, and use collected bottles to damage the endboss.

The game ends when:

- Pepe loses all health.
- The endboss is defeated.

After losing or winning, the player can restart the game or return to the menu without reloading the page.

## Controls

`Arrow Left` => Run left
`Arrow Right` => Run right
`Space` => Jump
`D` => Throw a bottle

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

## Mobile Support

Mobile touch controls and portrait/landscape handling are planned checklist tasks and are not fully implemented yet.

The current version is mainly tested for desktop keyboard controls.

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

Audio and asset credits are listed below.

Background music:
https://pixabay.com/music/video-games-game-gaming-video-game-music-471936/

Win sound effects:
https://pixabay.com/users/doge_goober57-41887056/

Game over sound effects:
https://pixabay.com/users/audley_fergine-32337609/

## Legal

This project includes an Impressum page:

`impressum.html`

## Status

This project is still in development as part of a frontend learning project.

Remaining checklist tasks include:

- Mobile touch controls
- Portrait warning / landscape-only mobile layout
- Bottle throw arc polish
- Bottle splash animation
- Final responsive polish
- Final console and clean-code review
