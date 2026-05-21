/**
 * Creates a fresh first level for a new game session.
 *
 * @returns {Level} A new level instance.
 */
function createLevel1() {
  return new Level(
    [
      new Chicken(1200, "normal"),
      new Chicken(1500, "small"),
      new Chicken(1800, "normal"),
      new Chicken(2300, "normal"),
      new Chicken(2650, "small"),
    ],
    [
      new Bottle(350),
      new Bottle(650),
      new Bottle(950),
      new Bottle(1150),
      new Bottle(1350),
      new Bottle(1550),
      new Bottle(1750),
      new Bottle(1950),
      new Bottle(2100),
      new Bottle(2200),
      new Bottle(2480),
      new Bottle(2840),
    ],
    [
      new Coin(430, 190),
      new Coin(680, 140),
      new Coin(920, 210),
      new Coin(1180, 155),
      new Coin(1460, 185),
      new Coin(1700, 130),
    ],
    [
      new BackgroundObject("assets/img/background/layers/air.png", -720, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", -720, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", -720, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", -720, 0),
      new Cloud(-720, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 0, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 0, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 0, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 0, 0),
      new Cloud(0, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 720, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 720, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 720, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 720, 0),
      new Cloud(720, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 1440, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 1440, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 1440, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 1440, 0),
      new Cloud(1440, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 2160, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 2160, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 2160, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 2160, 0),
      new Cloud(2160, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 2880, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 2880, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 2880, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 2880, 0),
      new Cloud(2880, 0),
    ],
    new Endboss(),
    2980
  );
}
