# El Pollo Loco

El Pollo Loco is a browser-based jump-and-run game built with HTML, CSS, JavaScript, and the Canvas API.

The player controls Pepe through a desert level, collects coins and salsa bottles, fights different types of chickens, and defeats the endboss.

## Live Demo

https://YOUR-EL-POLLO-LOCO-SUBDOMAIN

## How to Start

Open `index.html` in a browser.

For local development, it is recommended to use a local development server, such as the Live Server extension in Visual Studio Code.

The game does not start automatically. Click the **Start** button on the landing screen to begin.

## How to Play

Move through the desert, collect coins and salsa bottles, defeat enemies, and use the collected bottles to attack the endboss.

The game ends when:

- Pepe loses all health.
- The endboss is defeated.

After winning or losing, the player can restart the game or return to the main menu without reloading the page.

## Controls

### Desktop

- `Arrow Left`: Move left
- `Arrow Right`: Move right
- `Space`: Jump
- `D`: Throw a bottle

### Mobile

In landscape mode, touch buttons are available for:

- Moving left and right
- Jumping
- Throwing bottles

## Features

- Landing and start screen
- Guide and help dialog
- Playable character with movement and jump animations
- Hurt, idle, long-idle, sleep, and death states
- Extended desert level
- Health status bar
- Collectible coins
- Coin status bar
- Collectible salsa bottles
- Bottle status bar
- Throwable bottles
- Bottle throwing in both directions
- Bottle splash animation after a hit
- Automatic cleanup of missed bottles
- Normal chickens
- Small chickens
- Enemies can be defeated with bottles
- Enemies can be defeated by jumping on them
- Endboss with a health bar
- Win and game-over screens
- Restart without reloading the page
- Return-to-menu functionality
- Background music and sound effects
- Mute button
- Saved mute state using `localStorage`
- Fullscreen mode
- Responsive Impressum page
- Desktop Impressum link in the footer
- Mobile Impressum link on the start screen
- Mobile touch controls
- Portrait-orientation warning
- Landscape mobile gameplay

## Mobile Support

The game supports mobile touch controls in landscape orientation.

When the game is opened in portrait mode, a rotate-device message asks the player to turn the device.

The mobile landscape layout includes touch buttons for movement, jumping, and throwing bottles.

The Impressum can be opened from the desktop footer or from the mobile start screen.

## Technologies Used

- HTML
- CSS
- JavaScript
- Canvas API
- Object-oriented programming
- `localStorage`

## Project Structure

index.html Main application page
impressum.html Legal information

css/
Stylesheets for the game and responsive layout

js/
Main JavaScript files

js/classes/
Game object classes

js/levels/
Level configuration and level factory files

js/utils/
Audio and fullscreen utilities

js/screens/
Start screen and mobile control logic

assets/img/
Images, backgrounds, and character sprites

assets/audio/
Background music and sound effects

assets/fonts/
Local fonts

## Architecture

The project uses plain JavaScript loaded through script tags. It does not use JavaScript modules or an external framework.

The game follows an object-oriented structure. Game objects such as the character, enemies, collectibles, status bars, and endboss are organized into separate classes inside `js/classes/`.

Level creation is separated from the `World` class. The `Level` class and the `createLevel1()` factory create a fresh level for every new game session.

Audio and fullscreen functionality are stored inside `js/utils/`.

Start-screen behavior and mobile-control logic are stored inside `js/screens/`.

This structure separates the different responsibilities and makes the project easier to understand and maintain.

## Credits

This project uses external audio, image, and font assets for educational purposes.

### Audio

Background music:

https://pixabay.com/music/video-games-game-gaming-video-game-music-471936/

Win sound:

https://pixabay.com/users/doge_goober57-41887056/

Game-over sound:

https://pixabay.com/users/audley_fergine-32337609/

### Graphics

Game graphics and sprites were provided as part of the El Pollo Loco course project.

### Font

The Zabars font is included locally in:

assets/fonts/

## Legal

The project includes a responsive Impressum page:

impressum.html

It can be opened from the desktop footer and from the mobile landscape start screen.

## Status

This project was built as part of a frontend development course.
