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
      new Chicken(2950, "normal"),
      new Chicken(3200, "small"),
      new Chicken(3500, "normal"),
      new Chicken(3800, "small"),
      new Chicken(4100, "normal"),
      new Chicken(4400, "small"),
      new Chicken(4700, "normal"),
    ],
    [
      new Bottle(400),
      new Bottle(900),
      new Bottle(1450),
      new Bottle(2000),
      new Bottle(2550),
      new Bottle(3100),
      new Bottle(3650),
      new Bottle(4200),
      new Bottle(4750),
    ],
    [
      new Coin(500, 190),
      new Coin(1050, 140),
      new Coin(1600, 210),
      new Coin(2150, 155),
      new Coin(2700, 185),
      new Coin(3250, 130),
      new Coin(3800, 180),
      new Coin(4350, 150),
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

      new BackgroundObject("assets/img/background/layers/air.png", 3600, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 3600, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 3600, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 3600, 0),
      new Cloud(3600, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 4320, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 4320, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 4320, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 4320, 0),
      new Cloud(4320, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 5040, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 5040, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 5040, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 5040, 0),
      new Cloud(5040, 0),
    ],
    new Endboss(),
    5140
  );
}
